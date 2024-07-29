import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Personality Test</h1>
      <Link href="/test">Start personality test</Link>
    </div>
  );
}
