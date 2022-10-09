import Link from "next/link";

export const Header = () => {
  return (
    <header className="max-w-md mx-auto w-full ">
      <nav className="bg-gray-700 px-4 py-2 text-white">
        Nawigacja
        <Link href="/">Glowny</Link>
        <Link href="/about">O NAS</Link>
      </nav>
    </header>
  );
};
