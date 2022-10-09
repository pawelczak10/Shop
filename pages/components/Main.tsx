import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}

export const Main = ({ children }: MainProps) => (
  <main className="flex-grow max-w-2xl mx-auto w-full grid p-6 gap-6 sm:grid-cols-2 bg-teal-100">
    {children}
  </main>
);
