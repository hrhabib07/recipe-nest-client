/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useEffect } from "react";

import LoadingSpinner from "@/src/components/ui/LoadingSpinner";
import { useUserWithId } from "@/src/hooks/auth.hook";
import Image from "next/image";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

const page = () => {
  const { mutate, data } = useUserWithId();
  // console.log(data?.data);
  const userData = data?.data;

  useEffect(() => {
    mutate();
  }, [mutate]);
  console.log(data);

  return (
    <>
      {!data && <LoadingSpinner />}{" "}
      <div className="w-full  overflow-hidden shadow-md bg-default-100 relative">
        {/* Cover Photo */}
        <div
          className="w-full h-48 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1512058454905-6b841e7ad132?q=80&w=1995&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>

        {/* Profile Photo and Info */}
        <div className="flex flex-col justify-center items-center -mt-16 relative">
          {/* Profile Photo */}
          <Image
            src={userData?.profilePhoto}
            alt="User profile photo"
            width={96}
            height={96}
            className="rounded-full border-4 border-default shadow-lg"
          />
          {/* User Name and Bio */}
          <div className="text-center mt-4">
            <p className="text-2xl font-bold">{userData?.name}</p>
            <p className="text-sm text-default-900">Add your bio</p>
          </div>
          {/* Create New Post Button */}
          <div className="mt-6">
            <Button color="primary" className="bg-blue-500 text-default-700">
              Create New Post
            </Button>
          </div>
        </div>

        {/* Additional Content (Optional) */}
        <div className="p-4 mt-6 text-center">
          <p className="text-lg text-default-700">
            Welcome to your profile page! Here you can manage your posts and
            update your personal information.
          </p>
        </div>
      </div>
    </>
  );
};

export default page;
