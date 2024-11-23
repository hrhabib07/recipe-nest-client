/* eslint-disable react-hooks/rules-of-hooks */
"use client"; // Mark the component as a client-side component

import { Suspense, useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation"; // Client-side hooks only

import loginValidationSchema from "@/src/schemas/login.schema";
import RNForm from "@/src/components/form/RNForm";
import RNInput from "@/src/components/form/RNInput";
import { useUserLogin } from "@/src/hooks/auth.hook";
import LoadingSpinner from "@/src/components/ui/LoadingSpinner";
import { useUser } from "@/src/context/user.provider";
import { toast } from "sonner";

function CredentialsDisplay({
  label,
  email,
  password,
}: {
  label: string;
  email: string;
  password: string;
}) {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} credentials copied to clipboard!`);
  };

  return (
    <div className="mb-6 rounded-lg border p-4 shadow-md">
      <h4 className="mb-3 text-lg font-semibold">{label}</h4>
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-default-700">Email: {email}</span>
        <Button size="sm" className="" onClick={() => handleCopy(email)}>
          Copy
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-medium text-default-700">
          Password: {password}
        </span>
        <Button size="sm" className="" onClick={() => handleCopy(password)}>
          Copy
        </Button>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const searchParams = useSearchParams(); // Client-side hook
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const handleUserCredentials = () => {
    setAdminEmail("");
    setAdminPassword("");
    setUserEmail("user@test.com");
    setUserPassword("user@test");
  };

  const handleAdminCredentials = () => {
    setUserEmail("");
    setUserPassword("");
    setAdminEmail("admin@test.com");
    setAdminPassword("admin@test");
  };

  const router = useRouter(); // Client-side hook
  const { setIsLoading: userLoading } = useUser();

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
  }, [isPending, isSuccess, redirect, router]);

  return (
    <>
      {isPending && <LoadingSpinner />}

      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
        <h3 className="my-2 text-2xl font-bold">Login with RecipeNest</h3>
        <p className="mb-4">Welcome Back! Let&lsquo;s Get Started</p>
        <div className="mb-6 flex justify-between gap-4">
          {" "}
          <Button className=" w-full" onClick={handleUserCredentials}>
            Test User{" "}
          </Button>{" "}
          <Button className=" w-full" onClick={handleAdminCredentials}>
            Test Admin{" "}
          </Button>{" "}
        </div>
        {userEmail && (
          <CredentialsDisplay
            label="User Credentials"
            email={userEmail}
            password={userPassword}
          />
        )}
        {adminEmail && (
          <CredentialsDisplay
            label="Admin Credentials"
            email={adminEmail}
            password={adminPassword}
          />
        )}
        <div className="md:w-[35%]">
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
