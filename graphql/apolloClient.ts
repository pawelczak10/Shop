import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cla5eriha491v01uk8ej95q4c/master",
  cache: new InMemoryCache(),
});
