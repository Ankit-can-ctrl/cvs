import Link from "next/link";
export default function Home() {
  return (
    <div>
      <Link href={"/signup"}>Create Account</Link>
    </div>
  );
}
