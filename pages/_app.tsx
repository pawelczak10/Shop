import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "../components/Layout";
import SEO from "../next-seo.config";
import { DefaultSeo } from "next-seo";
import { CartStateContextProvider } from "./../components/Cart/CartContext";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "../graphql/apolloClient";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
const client = new QueryClient();

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  return (
    <SessionProvider session={pageProps.session}>
      <ApolloProvider client={apolloClient}>
        <CartStateContextProvider>
          <Layout>
            <DefaultSeo {...SEO} />
            <QueryClientProvider client={client} contextSharing={true}>
              <Component {...pageProps} />
            </QueryClientProvider>
          </Layout>
        </CartStateContextProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;
