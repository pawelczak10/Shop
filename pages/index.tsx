import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { ProductListItem } from "../components/Product";
import { Main } from "../components/Main";
import { gql, useQuery } from "@apollo/client";
import { apolloClient } from "../graphql/apolloClient";
import NewsLetterForm from "../components/NewletterForm";
import {
  CreateProductReviesDocument,
  CreateProductReviesMutation,
  CreateProductReviesMutationVariables,
  GetProductDetailsQueryVariables,
} from "../src/gql/graphql";
import { ProductReviewList } from "../components/ProductReview/ProductReviewList";

const Home = () => {
  // const addReview = async () => {
  //   const data = await apolloClient.mutate<
  //     CreateProductReviesMutation,
  //     CreateProductReviesMutationVariables
  //   >({
  //     mutation: CreateProductReviesDocument,
  //     variables: {
  //       review: {
  //         headline: "KLIENT",
  //         name: "Pawel",
  //         email: "test@test.com",
  //         content: "nice!",
  //         rating: 5,
  //       },
  //     },
  //   });
  // };
  {
    /* <form>
        <button onClick={addReview} type="button">
          add comment
        </button>
      </form> */
  }
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 py-16 pt-28 text-center">
          <div className="mx-auto max-w-lg">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white md:text-4xl">
              Hello, welcome to our online shop. Do you want to keep up to date?
              Sign up for the newsletter!
            </h1>
            <NewsLetterForm />

          </div>
        </div>
      </header>
    </div>
  );
};

export default Home;
