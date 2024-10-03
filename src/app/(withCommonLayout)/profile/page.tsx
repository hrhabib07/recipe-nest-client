/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useEffect, useState } from "react";

import LoadingSpinner from "@/src/components/ui/LoadingSpinner";
import { useUserData, useUserInfoUpdate } from "@/src/hooks/auth.hook";
import Image from "next/image";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { MdEdit } from "react-icons/md";
import RNForm from "@/src/components/form/RNForm";
import RNInput from "@/src/components/form/RNInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import UpdateBioModal from "@/src/components/ui/UpdateBioModal";
import UpdateProfileModal from "@/src/components/ui/UpdateProfileModal";

const page = () => {
  const { data, isLoading, isError } = useUserData();
  const userData = data?.data;
  // console.log(isError);
  return (
    <>
      {isLoading && <LoadingSpinner />}{" "}
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
            src={
              userData?.profilePhoto ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
            alt="User profile photo"
            width={96}
            height={96}
            className="rounded-full border-4 border-default shadow-lg size-28"
          />

          {/* User Name and Bio */}
          <div className="text-center mt-4 flex flex-col items-center">
            {/* User Name */}
            <div className="flex items-center justify-center">
              {/* Bio Text */}
              <p className="text-2xl font-bold  me-2">{userData?.name}</p>

              <UpdateProfileModal userData={userData}></UpdateProfileModal>
            </div>

            {/* User Bio Section */}
            <div className="mt-2 text-center">
              {userData?.bio ? (
                <div className="flex items-center justify-center">
                  {/* Bio Text */}
                  <p className="text-sm text-default-900 max-w-xs mr-2">
                    {userData?.bio}
                  </p>

                  {/* Edit Icon */}
                  <UpdateBioModal
                    buttonText="update"
                    userData={userData}
                  ></UpdateBioModal>
                </div>
              ) : (
                <UpdateBioModal
                  buttonText="Add Bio"
                  userData={userData}
                ></UpdateBioModal>
              )}
            </div>
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
