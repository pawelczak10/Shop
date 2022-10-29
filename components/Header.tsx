import Link from "next/link";
import { CartBar } from "./Cart/CartBar";

export const Header = () => {
  return (
    <header className="min-w-full max-w-5xl mx-auto flex px-4 items-center justify-between bg-gray-700">
      <nav className=" px-4 py-4 space-x-4 text-lg text-white">
        <Link href="/">Głowna</Link>
        <Link href="/about">About</Link>
      </nav>
      <CartBar />
    </header>
  );
};
