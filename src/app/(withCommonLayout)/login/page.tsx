"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";

import loginValidationSchema from "@/src/schemas/login.schema";
import RNForm from "@/src/components/form/RNForm";
import RNInput from "@/src/components/form/RNInput";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserLogin } from "@/src/hooks/auth.hook";
import { Progress } from "@nextui-org/progress";
import { Spinner } from "@nextui-org/spinner";
import LoadingSpinner from "@/src/components/ui/LoadingSpinner";
import { useUser } from "@/src/context/user.provider";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();
  // const { mutate: handleUserLogin } = useUserLogin();
  const redirect = searchParams.get("redirect");

  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleUserLogin(data);
    userLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess]);

  return (
    <>
      {isPending && <LoadingSpinner></LoadingSpinner>}

      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
        <h3 className="my-2 text-2xl font-bold">Login with FoundX</h3>
        <p className="mb-4">Welcome Back! Let&lsquo;s Get Started</p>
        <div className="w-[35%]">
          <RNForm
            resolver={zodResolver(loginValidationSchema)}
            onSubmit={onSubmit}
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
            Don&lsquo;t have account ? <Link href={"/register"}>Register</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
