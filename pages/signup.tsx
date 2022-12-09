import * as React from "react";
import { useForm } from "react-hook-form";
import { validateCreditCardDate } from "../utils";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const SignupPage = () => {
  const session = useSession();
  const router = useRouter();
  const signUpFormSchema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    })
    .required();

  type SignupPage = yup.InferType<typeof signUpFormSchema>;
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupPage>({
    resolver: yupResolver(signUpFormSchema),
  });
  const onSubmit = handleSubmit(async (data) => {
    await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  });
  if (session.status === "authenticated") {
    router.push("/");
    return null;
  }
  return (
    <form
      className="mx-auto max-w-md my-6 grid grid-cols-6 gap-4"
      onSubmit={onSubmit}
    >
      <div className="col-span-6">
        <label className="mb-1 block text-sm text-gray-600">Email</label>

        <input
          className="w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm"
          type="email"
          id="email"
          {...register("email", { required: true })}
        />
      </div>
      <div className="col-span-6">
        <label className="mb-1 block text-sm text-gray-600">Password</label>

        <input
          className="w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm"
          type="password"
          id="password"
          {...register("password", { required: true })}
        />
      </div>

      <div className="col-span-6">
        <button
          className="block w-full rounded-lg bg-black p-2.5 text-sm text-white"
          type="submit"
        >
          Sign up{" "}
        </button>
      </div>
    </form>
  );
};

export default SignupPage;
