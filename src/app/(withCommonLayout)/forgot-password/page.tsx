"use client";
import { Button } from "@nextui-org/button";
import React from "react";

import RNForm from "@/src/components/form/RNForm";
import RNInput from "@/src/components/form/RNInput";
import LoadingSpinner from "@/src/components/ui/LoadingSpinner";
import { useForgetPassword } from "@/src/hooks/auth.hook";

const Page = () => {
  // const isSuccess = true;
  const { mutate: forgetPassword, isSuccess, isPending } = useForgetPassword();
  const onSubmit = (data: { email: string }) => {
    forgetPassword(data);
  };

  return (
    <>
      {isPending && <LoadingSpinner />}
      {!isSuccess ? (
        <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
          <h3 className="my-2 text-2xl font-bold">Forgot your password</h3>
          <p className="mb-4">Enter your email to get a reset password URL</p>
          <div className="w-[35%]">
            <RNForm
              // resolver={zodResolver(loginValidationSchema)}
              onSubmit={onSubmit}
            >
              <div className="py-3">
                <RNInput label="Email" name="email" type="email" />
              </div>

              <Button
                className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
                size="lg"
                type="submit"
              >
                Reset Password
              </Button>
            </RNForm>
          </div>
        </div>
      ) : (
        <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center ">
          <div className="w-[90%] md:w-[40%] flex flex-col items-center gap-4 p-6 bg-gradient-to-b from-default-100 to-default-50 rounded-lg shadow-lg">
            <div className="bg-default-100 shadow-md backdrop-blur-xl rounded-full p-3">
              <svg
                className="h-12 w-12 text-green-500"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                  fillRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-2xl font-bold text-green-600 text-center">
              Check Your Email
            </p>
            <p className="text-center text-default-600 text-lg">
              We have sent you an email with a link to reset your password.
              Please follow the instructions in the email to proceed. If you
              cannot find the email, check your spam folder or request another
              one.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
