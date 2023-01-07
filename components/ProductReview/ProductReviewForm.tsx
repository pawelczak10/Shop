import * as React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import {
  GetReviewsForProductSlugDocument,
  GetReviewsForProductSlugQuery,
  useCreateProductReviesMutation,
} from "../../src/gql/graphql";

const reviewFormSchema = yup
  .object({
    content: yup.string().required(),
    headline: yup.string().required(),
    email: yup.string().email().required(),
    name: yup.string().required(),
    rating: yup.number().min(1).max(5).required(),
  })
  .required();

type ReviewFormData = yup.InferType<typeof reviewFormSchema>;

interface ProductReviewFormProps {
  productSlug: string;
}
export const ProductReviewForm = ({ productSlug }: ProductReviewFormProps) => {
  useMutation(async ({ email }: { email: string }) => {
    await fetch("http://localhost:3002/api/hello", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
  });

  const { register, handleSubmit } = useForm<ReviewFormData>({
    resolver: yupResolver(reviewFormSchema),
  });

  const [createReview, { data, loading, error }] =
    useCreateProductReviesMutation({
      //   refetchQueries: [
      //     {
      //       query: GetReviewsForProductSlugDocument,
      //       variables: { slug: productSlug },
      //     },
      //   ],
      update(cache, result) {
        const orginalReviewsQuery =
          cache.readQuery<GetReviewsForProductSlugQuery>({
            query: GetReviewsForProductSlugDocument,
            variables: { slug: productSlug },
          });
        if (!orginalReviewsQuery?.product?.reviews || !result.data?.review) {
          return;
        }
        const newReviewsQuery = {
          ...orginalReviewsQuery,
          product: {
            ...orginalReviewsQuery.product,
            reviews: [
              ...orginalReviewsQuery.product.reviews,
              result.data.review,
            ],
          },
        };
        console.log(newReviewsQuery);
        cache.writeQuery({
          query: GetReviewsForProductSlugDocument,
          variables: { slug: productSlug },
          data: newReviewsQuery,
        });
      },
    });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    createReview({
      variables: {
        review: {
          ...data,
          product: {
            connect: {
              slug: productSlug,
            },
          },
        },
      },
      optimisticResponse: {
        __typename: "Mutation",
        review: {
          __typename: "Review",
          id: (-Math.random()).toString(),
          ...data,
        },
      },
    });
  });
  return (
    <section>
      <div className="mx-auto max-w-screen-xl py-16 sm:px-1 lg:px-1">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
          <div className="lg:col-span-2 lg:py-12">
            <p className="max-w-xl text-lg">
              Your product review will help us provide the highest quality
              service!
            </p>
            <div className="mt-8">
              <a href="" className="text-2xl font-bold text-red-600">
                723 123 123
              </a>
              <address className="mt-2 not-italic">
                Plac Grunwaldzki, 50-384 Wrocław
              </address>
            </div>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-lg lg:col-span-3 lg:p-4">
            <form onSubmit={onSubmit} className="space-y-3">
              <div>
                <label className="sr-only block text-sm text-gray-600">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  required
                  {...register("name")}
                  className="mt-1 w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm"
                />
                <p className="mt-1 text-sm text-red-600 dark:text-red-500"></p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="sr-only block text-sm text-gray-600">
                    Adres e-mail
                  </label>
                  <input
                    required
                    type="email"
                    {...register("email")}
                    placeholder="Adres e-mail"
                    className="mt-1 w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm"
                  />
                  <p className="mt-1 text-sm text-red-600 dark:text-red-500"></p>
                </div>
                <div>
                  <label className="sr-only">Rating</label>
                  <input
                    id="countries"
                    type="number"
                    required
                    placeholder="Rating"
                    {...register("rating")}
                    className="mt-1 w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm"
                  >
                  </input>
                </div>
              </div>
              <div>
                <label className="sr-only block text-sm text-gray-600">
                  Headline
                </label>
                <input
                  type="text"
                  required
                  placeholder="Headline"
                  {...register("headline")}
                  className="mt-1 w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm"
                />
                <p className="mt-1 text-sm text-red-600 dark:text-red-500"></p>
              </div>
              <div>
                <label className="sr-only">Content</label>
                <textarea
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Content"
                  rows={8}
                  {...register("content")}
                  required
                  id="message"
                ></textarea>
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-lg dark:text-gray-900 bg-gray-800 hover:bg-black focus:ring-offset-2 focus:ring-gray-800 px-5 py-3 text-white sm:w-auto"
                >
                  <span className="font-medium "> Add reviews </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-3 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    // <form
    //   onSubmit={onSubmit}
    //   className="flex flex-col max-w-md mx-auto gap-y-4 mb-16"
    // >
    //   <label>
    //     content
    //     <input
    //       type="text"
    //       required
    //       {...register("content")}
    //       className="w-full appearance-none px-5 py-3  border border-transparent text-base leading-6 rounded-md text-gray-900 bg-gray-200 placeholder-gray-500 focus:outline:none focus:placeholder-gray-400 transition duration-150 ease-in-out"
    //     />
    //   </label>
    //   <label>
    //     headline
    //     <input
    //       type="text"
    //       required
    //       {...register("headline")}
    //       className="w-full appearance-none px-5 py-3 border border-transparent text-base leading-6 rounded-md text-gray-900 bg-gray-200 placeholder-gray-500 focus:outline:none focus:placeholder-gray-400 transition duration-150 ease-in-out"
    //     />
    //   </label>
    //   <label>
    //     email
    //     <input
    //       type="email"
    //       required
    //       {...register("email")}
    //       className="w-full appearance-none px-5 py-3 border border-transparent text-base leading-6 rounded-md text-gray-900 bg-gray-200 placeholder-gray-500 focus:outline:none focus:placeholder-gray-400 transition duration-150 ease-in-out"
    //     />
    //   </label>
    //   <label>
    //     name
    //     <input
    //       type="text"
    //       required
    //       {...register("name")}
    //       className="w-full appearance-none px-5 py-3 border border-transparent text-base leading-6 rounded-md text-gray-900 bg-gray-200 placeholder-gray-500 focus:outline:none focus:placeholder-gray-400 transition duration-150 ease-in-out"
    //     />
    //   </label>
    //   <label>
    //     rating
    //     <input
    //       type="number"
    //       required
    //       {...register("rating")}
    //       className="w-full appearance-none px-5 py-3 border border-transparent text-base leading-6 rounded-md text-gray-900 bg-gray-200 placeholder-gray-500 focus:outline:none focus:placeholder-gray-400 transition duration-150 ease-in-out"
    //     />
    //   </label>
    //   <div className="mt-3 rounded-md shadow sm:mt-0 sm:flex-shrink-0">
    //     <button className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md  bg-blue-500 hover:bg-blue-400 transition duration-150 ease-in-out">
    //       Dodaj komentarz
    //     </button>
    //   </div>
    // </form>
  );
};
