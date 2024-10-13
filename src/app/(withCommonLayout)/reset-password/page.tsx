"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";
import { jwtDecode } from "jwt-decode";

import RNForm from "@/src/components/form/RNForm";
import RNInput from "@/src/components/form/RNInput";
import LoadingSpinner from "@/src/components/ui/LoadingSpinner";
import { useResetPassword } from "@/src/hooks/auth.hook";

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutate: resetPassword, isPending, isSuccess } = useResetPassword();
  const [email, setEmail] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get("token");
    const emailFromParams = searchParams.get("email");

    if (token) {
      setAccessToken(token);

      try {
        const decodedToken = jwtDecode(token);
        setEmail((decodedToken as any).email || emailFromParams); // Fallback to query email
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, [searchParams]);

  const onSubmit = (data: any) => {
    if (email && accessToken) {
      const payload = { ...data, email, accessToken };
      resetPassword(payload);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/login");
    }
  }, [isSuccess, router]);

  return (
    <>
      {isPending && <LoadingSpinner />}

      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
        <h3 className="my-2 text-2xl font-bold">Reset Your Password</h3>
        <p className="mb-4">Enter your new password to reset your password</p>
        <div className="w-[35%]">
          <RNForm onSubmit={onSubmit}>
            <div className="py-3">
              <RNInput label="Password" name="newPassword" type="password" />
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
    </>
  );
};

// Wrap in Suspense
const Page = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <ResetPasswordForm />
  </Suspense>
);

export default Page;
