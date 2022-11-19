import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { ProductListItem } from "../components/Product";
import { Main } from "../components/Main";
import { gql, useQuery } from "@apollo/client";
import { apolloClient } from "../graphql/apolloClient";
import {
  CreateProductReviesDocument,
  CreateProductReviesMutation,
  CreateProductReviesMutationVariables,
  GetProductDetailsQueryVariables,
} from "../src/gql/graphql";

const Home = () => {
  const addReview = async () => {
    const data = await apolloClient.mutate<
      CreateProductReviesMutation,
      CreateProductReviesMutationVariables
    >({
      mutation: CreateProductReviesDocument,
      variables: {
        review: {
          headline: "KLIENT",
          name: "Pawel",
          email: "test@test.com",
          content: "nice!",
          rating: 5,
        },
      },
    });
    console.log(data);
  };

  return (
    <Main>
      <form>
        <button onClick={addReview} type="button">
          add comment
        </button>
      </form>
    </Main>
  );
};

export default Home;
