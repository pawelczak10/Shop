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

  const { mutate } = useAddToNewsletterMutation();

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <form className="flex flex-col" onSubmit={onSubmit}>
      <input
        aria-label="Email address"
        type="email"
        required
        {...register("email", { required: "Podaj email" })}
        placeholder="Enter your email"
        className="w-full appearance-none px-5 py-3 border border-transparent text-base leading-6 rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline:none focus:placeholder-gray-400 transition duration-150 ease-in-out"
      />
      <div className="mt-3 rounded-md shadow sm:mt-0 sm:flex-shrink-0">
        <button className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 transition duration-150 ease-in-out">
          Try it & Subscribe
        </button>
      </div>
    </form>
  );
};

export default Newsletterform;
