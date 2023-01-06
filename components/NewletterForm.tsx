import * as React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";

const useAddToNewsletterMutation = () =>
  useMutation(async ({ email }: { email: string }) => {
    await fetch("http://localhost:3002/api/hello", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
  });

const Newsletterform = () => {
  const schema = yup
    .object({
      email: yup.string().email().required(),
    })
    .required();

  type FormData = yup.InferType<typeof schema>;
  const { register, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { mutate, status } = useAddToNewsletterMutation();

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <>
      <div className="mx-auto mt-6 w-full max-w-sm rounded-md border bg-transparent focus-within:border-blue-400 focus-within:ring focus-within:ring-blue-300 focus-within:ring-opacity-40 dark:border-gray-700 dark:focus-within:border-blue-300">
        <form className="flex flex-col md:flex-row" onSubmit={onSubmit}>
          <input
            aria-label="Email addres addresss"
            type="email"
            required
            {...register("email", { required: "Podaj email" })}
            placeholder="Enter your email address"
            className="m-1 h-10 flex-1 appearance-none border-none bg-transparent px-4 py-2 text-gray-700 placeholder-gray-400 focus:placeholder-transparent focus:outline-none focus:ring-0 dark:text-gray-200"
          />
          <div className="mt-3 rounded-md shadow sm:mt-0 sm:flex-shrink-0">
            <button className="m-1 h-10 transform rounded-md bg-blue-500 px-4 py-2 text-white transition-colors duration-300 hover:bg-blue-400 focus:bg-blue-400 focus:outline-none">
              Try it & Subscribe
            </button>
          </div>
        </form>
      </div>
      <p>{status === "success" && "Everything went well!"}</p>
    </>
  );
};

export default Newsletterform;
