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
  //   console.log(data);
  // };
  {/* <form>
        <button onClick={addReview} type="button">
          add comment
        </button>
      </form> */}
  {/* <NewsLetterForm /> */ }
  return (

    <div className="flex flex-col min-h-screen">
      <header className="bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 py-16 pt-28 text-center">
          <div className="mx-auto max-w-lg">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white md:text-4xl">Hello, welcome to our online shop. Do you want to keep up to date? Sign up for the newsletter!</h1>
            <div className="mx-auto mt-6 w-full max-w-sm rounded-md border bg-transparent focus-within:border-blue-400 focus-within:ring focus-within:ring-blue-300 focus-within:ring-opacity-40 dark:border-gray-700 dark:focus-within:border-blue-300">
              <form className="flex flex-col md:flex-row">
                <input type="email" placeholder="Enter your email address" className="m-1 h-10 flex-1 appearance-none border-none bg-transparent px-4 py-2 text-gray-700 placeholder-gray-400 focus:placeholder-transparent focus:outline-none focus:ring-0 dark:text-gray-200" />
                <button type="button" className="m-1 h-10 transform rounded-md bg-blue-500 px-4 py-2 text-white transition-colors duration-300 hover:bg-blue-400 focus:bg-blue-400 focus:outline-none">Join Us</button>
              </form>
            </div>
          </div>
        </div>
      </header >
    </div >

  );
};

export default Home;
