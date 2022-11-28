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
      refetchQueries: [
        {
          query: GetReviewsForProductSlugDocument,
          variables: { slug: productSlug },
        },
      ],
      //   update(cache, result) {
      //     const orginalReviewsQuery =
      //       cache.readQuery<GetReviewsForProductSlugQuery>({
      //         query: GetReviewsForProductSlugDocument,
      //         variables: { slug: productSlug },
      //       });
      //     if (!orginalReviewsQuery?.product?.reviews || !result.data?.review) {
      //       return;
      //     }
      //     const newReviewsQuery = {
      //       ...orginalReviewsQuery,
      //       product: {
      //         ...orginalReviewsQuery.product,
      //         reviews: [
      //           ...orginalReviewsQuery.product.reviews,
      //           result.data.review,
      //         ],
      //       },
      //     };
      //     console.log(newReviewsQuery);
      //     cache.writeQuery({
      //       query: GetReviewsForProductSlugDocument,
      //       variables: { slug: productSlug },
      //       data: newReviewsQuery,
      //     });
      //   },
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
      //   optimisticResponse: {
      //     __typename: "Mutation",
      //     review: {
      //       __typename: "Review",
      //       id: (-Math.random()).toString(),
      //       ...data,
      //     },
      //   },
    });
  });
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col max-w-md mx-auto gap-y-4 mb-16"
    >
      <label>
        content
        <input
          type="text"
          required
          {...register("content")}
          className="w-full appearance-none px-5 py-3  border border-transparent text-base leading-6 rounded-md text-gray-900 bg-gray-200 placeholder-gray-500 focus:outline:none focus:placeholder-gray-400 transition duration-150 ease-in-out"
        />
      </label>
      <label>
        headline
        <input
          type="text"
          required
          {...register("headline")}
          className="w-full appearance-none px-5 py-3 border border-transparent text-base leading-6 rounded-md text-gray-900 bg-gray-200 placeholder-gray-500 focus:outline:none focus:placeholder-gray-400 transition duration-150 ease-in-out"
        />
      </label>
      <label>
        email
        <input
          type="email"
          required
          {...register("email")}
          className="w-full appearance-none px-5 py-3 border border-transparent text-base leading-6 rounded-md text-gray-900 bg-gray-200 placeholder-gray-500 focus:outline:none focus:placeholder-gray-400 transition duration-150 ease-in-out"
        />
      </label>
      <label>
        name
        <input
          type="text"
          required
          {...register("name")}
          className="w-full appearance-none px-5 py-3 border border-transparent text-base leading-6 rounded-md text-gray-900 bg-gray-200 placeholder-gray-500 focus:outline:none focus:placeholder-gray-400 transition duration-150 ease-in-out"
        />
      </label>
      <label>
        rating
        <input
          type="number"
          required
          {...register("rating")}
          className="w-full appearance-none px-5 py-3 border border-transparent text-base leading-6 rounded-md text-gray-900 bg-gray-200 placeholder-gray-500 focus:outline:none focus:placeholder-gray-400 transition duration-150 ease-in-out"
        />
      </label>
      <div className="mt-3 rounded-md shadow sm:mt-0 sm:flex-shrink-0">
        <button className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md  bg-blue-500 hover:bg-blue-400 transition duration-150 ease-in-out">
          Dodaj komentarz
        </button>
      </div>
    </form>
  );
};
