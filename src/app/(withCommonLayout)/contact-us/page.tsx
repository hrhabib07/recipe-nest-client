"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler } from "react-hook-form";

import RNForm from "@/src/components/form/RNForm";
import RNInput from "@/src/components/form/RNInput";
import RNTextarea from "@/src/components/form/RNTextArea";

const ContactUs = () => {
  const router = useRouter();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    toast.success("Your request has been submitted");
    router.push("/");
  };

  return (
    <section className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
      <div className="w-[35%]">
        <h1 className="text-4xl font-bold text-default-900 mb-6">Contact Us</h1>
        <p className="text-lg text-default-700 max-w-2xl mb-8">
          Have any questions or need support? Feel free to reach out to us
          through the form below.
        </p>
        <RNForm onSubmit={onSubmit}>
          <div className="py-3">
            <RNInput label="Email" name="email" type="email" />
          </div>
          <div className="py-3">
            <RNInput label="Name" name="name" type="name" />
          </div>
          <div className="flex flex-wrap-reverse gap-2 py-2">
            <div className="min-w-fit flex-1">
              <RNTextarea label="Description" name="description" />
            </div>
          </div>

          <Button
            className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
            size="lg"
            type="submit"
          >
            Send Message
          </Button>
        </RNForm>
      </div>
    </section>
  );
};

export default ContactUs;
