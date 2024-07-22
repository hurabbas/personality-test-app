import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  console.log("hello i am here");
  const { searchParams } = new URL(request.url);
  console.log("searchParams: %o", searchParams);
  const id = searchParams.get("id");

  console.log(id);

  if (!id) {
    return NextResponse.json(
      { error: "ID parameter is missing" },
      { status: 400 },
    );
  }

  const question = await prisma.question.findUnique({
    where: { id: Number(id) },
    include: { options: true },
  });
  if (!question) {
    return NextResponse.json({ error: "Question not found" }, { status: 404 });
  }

  return NextResponse.json(question);
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const { text, options } = await request.json();

  if (!id) {
    return NextResponse.json(
      { error: "ID parameter is missing" },
      { status: 400 },
    );
  }

  const question = await prisma.question.update({
    where: { id: Number(id) },
    data: {
      text,
      options: {
        deleteMany: {},
        create: options,
      },
    },
  });

  return NextResponse.json(question);
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "ID parameter is missing" },
      { status: 400 },
    );
  }

  await prisma.question.delete({ where: { id: Number(id) } });
  return NextResponse.json({ status: 204 });
}
