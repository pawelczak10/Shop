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
    <>
      <section className="h-screen">
        <div className="px-6 h-full text-gray-800">
          <div
            className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
          >
            <div
              className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
            >
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full"
                alt="Sample image"
              />
            </div>
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">

              <form
                className="mx-auto max-w-md my-6 grid grid-cols-6 gap-4"
                onSubmit={onSubmit}
              >
                <div className="col-span-6">

                  <label className="mb-1 block text-sm text-gray-600">Email</label>
                  <input
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    type="email"
                    id="email"
                    {...register("email", { required: true })}
                  />
                </div>

                <div className="col-span-6">
                  <label className="mb-1 block text-sm text-gray-600">Password</label>

                  <input
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    type="password"
                    id="password"
                    {...register("password", { required: true })}
                  />
                </div>

                <div className="col-span-6">
                  <button
                    className="block w-full rounded-lg  bg-blue-600 p-2.5 text-sm text-white"
                    type="submit"
                  >
                    Registry
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
};

export default SignupPage;
