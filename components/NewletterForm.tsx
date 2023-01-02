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
interface NewsLetterFormViewProps {
  status: "error" | "idle" | "loading" | "success";
  onSubmit: (FormData: any) => void;
}
export const NewsLetterForm = () => {
  const { mutate, status } = useAddToNewsletterMutation();

  return <NewsletterformView onSubmit={mutate} status={status} />;
};

const NewsletterformView = ({ onSubmit, status }: NewsLetterFormViewProps) => {
  const schema = yup
    .object({
      email: yup.string().email().required(),
    })
    .required();

  type FormData = yup.InferType<typeof schema>;
  const { register, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const doSubmit = handleSubmit((data) => onSubmit(data));

  return (
    <form className="flex flex-col" onSubmit={doSubmit}>
      <input
        aria-label="Email address"
        type="email"
        required
        {...register("email", { required: "Podaj email" })}
        placeholder="Enter your email"
        data-testid="email-newsletter-input"
        className="w-full appearance-none px-5 py-3 border border-transparent text-base leading-6 rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline:none focus:placeholder-gray-400 transition duration-150 ease-in-out"
      />
      <div className="mt-3 rounded-md shadow sm:mt-0 sm:flex-shrink-0">
        <button
          data-testid="email-newsletter-submit"
          className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 transition duration-150 ease-in-out"
        >
          Try it & Subscribe
        </button>
      </div>
      <p>
        {status === "success" && "wszytsko okej"}
      </p>
    </form>
  );
};

export default NewsletterformView;
