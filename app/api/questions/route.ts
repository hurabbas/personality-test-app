import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    const questions = await prisma.question.findMany({ include: { options: true } });
    return NextResponse.json(questions);
}

export async function POST(req: NextRequest) {
    const { text, options } = await req.json();
    const question = await prisma.question.create({
        data: {
            text,
            options: {
                create: options,
            },
        },
    });
    return NextResponse.json(question, { status: 201 });
}
