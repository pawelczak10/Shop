import Link from "next/link";

export const Header = () => {
  return (
    <header className="max-w-md w-full">
      <nav className="bg-gray-700 px-4 py-4  text-white">
        Nawigacja
        <Link href="/">Glowny</Link>
        <Link href="/about">O NAS</Link>
      </nav>
    </header>
  );
};
