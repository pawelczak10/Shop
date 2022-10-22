import { Children } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ReactNode } from "react";
import Head from "next/head";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Head >
        <title>Shop</title>
        <meta name="description" content="test"></meta>
      </Head>
      <Header />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
};
