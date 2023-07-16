import Link from "next/link";

const Navigation = () => {
  return (
    <div className="bg-primary-200 flex flex-1 justify-center h-[43px]">
      <Link href="/" className="underline mr-2">Home</Link>
      <Link href="/today" className="underline">Today</Link>
    </div>
  );
};
export default Navigation;
