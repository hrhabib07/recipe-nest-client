/* eslint-disable react-hooks/rules-of-hooks */
"use client"; // Mark the component as a client-side component

import { Suspense, useEffect } from "react";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation"; // Client-side hooks only

import loginValidationSchema from "@/src/schemas/login.schema";
import RNForm from "@/src/components/form/RNForm";
import RNInput from "@/src/components/form/RNInput";
import { useUserLogin } from "@/src/hooks/auth.hook";
import LoadingSpinner from "@/src/components/ui/LoadingSpinner";
import { useUser } from "@/src/context/user.provider";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const searchParams = useSearchParams(); // Client-side hook
  const router = useRouter(); // Client-side hook
  const { setIsLoading: userLoading } = useUser();

  const redirect = searchParams.get("redirect");

  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();

  const { setValue, handleSubmit } = useForm<FieldValues>({
    resolver: zodResolver(loginValidationSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleUserLogin(data);
    userLoading(true);
  };

  const fillTestCredentials = (email: string, password: string) => {
    setValue("email", email);
    setValue("password", password);
  };
  // console.log(email, password);

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess, redirect, router]);

  return (
    <>
      {isPending && <LoadingSpinner />}

      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
        <h3 className="my-2 text-2xl font-bold">Login with RecipeNest</h3>
        <p className="mb-4">Welcome Back! Let&lsquo;s Get Started</p>
        <div className="flex gap-4 mb-6">
          <Button
            className="bg-blue-500 text-white hover:bg-blue-700"
            onClick={() =>
              fillTestCredentials("test@user1.com", "test@user1.com")
            }
          >
            Test User
          </Button>
          <Button
            className="bg-red-500 text-white hover:bg-red-700"
            onClick={() =>
              fillTestCredentials("admin@admin.com", "admin@admin")
            }
          >
            Admin
          </Button>
        </div>
        <div className="md:w-[35%]">
          <RNForm
            resolver={zodResolver(loginValidationSchema)}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="py-3">
              <RNInput label="Email" name="email" type="email" />
            </div>
            <div className="py-3">
              <RNInput label="Password" name="password" type="password" />
            </div>

            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Login
            </Button>
          </RNForm>

          <div className="text-center">
            <div>
              Don&lsquo;t have an account?{" "}
              <Link href={"/register"}>
                {" "}
                <span className="text-blue-500 hover:underline cursor-pointer">
                  Register
                </span>{" "}
              </Link>
            </div>
            <div>
              <Link href={"/forgot-password"}>
                {" "}
                <small className="text-blue-500 hover:underline cursor-pointer">
                  Forgot Password?
                </small>{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
