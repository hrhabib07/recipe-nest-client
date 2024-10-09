"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";

import registerValidationSchema from "@/src/schemas/register.schema";
import RNInput from "@/src/components/form/RNInput";
import RNForm from "@/src/components/form/RNForm";
import { useUserRegistration } from "@/src/hooks/auth.hook";

export default function RegisterPage() {
  // const {
  //   mutate: handleUserRegistration,
  //   isPending,
  //   data,
  //   isError,
  //   isSuccess,
  // } = useMutation({
  //   mutationKey: ["user-registration"],
  //   mutationFn: async (userData) => await registerUser(userData),
  // });
  // console.log(isPending, isSuccess, data);
  const { mutate: handleUserRegistration, isPending } = useUserRegistration();

  useEffect(() => {
    if (isPending) {
      // Handle Loading satate
    }
  }, [isPending]);

  if (isPending) {
    //  handle loadingit ag state
  }
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userData = {
      ...data,
      profilePhoto:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    };

    // console.log("Inside form user data: ", userData);

    handleUserRegistration(userData);
  };

  return (
    <div className="flex h-[calc(100vh-100px)] flex-col items-center justify-center">
      <h3 className="my-2 text-xl font-bold">Register with RecipeNest</h3>
      <p className="mb-4">Help Lost Items Find Their Way Home</p>
      <div className="w-3/4 md:w-[35%]">
        <RNForm
          resolver={zodResolver(registerValidationSchema)}
          onSubmit={onSubmit}
        >
          <div className="py-3">
            <RNInput label="Name" name="name" size="sm" />
          </div>
          <div className="py-3">
            <RNInput label="Email" name="email" size="sm" />
          </div>
          <div className="py-3">
            <RNInput label="Mobile Number" name="mobileNumber" size="sm" />
          </div>
          <div className="py-3">
            <RNInput
              label="Password"
              name="password"
              size="sm"
              type="password"
            />
          </div>

          <Button
            className="my-3 w-full rounded-md bg-default-900 text-default"
            size="lg"
            type="submit"
          >
            Registration
          </Button>
        </RNForm>
        <div className="text-center">
          Already have an account ? <Link href={"/login"}>Login</Link>
        </div>
      </div>
    </div>
  );
}
