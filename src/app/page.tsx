import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h2>Hello from Homepage</h2>
      <Link href="/inbox">Inbox</Link>
    </main>
  );
}
