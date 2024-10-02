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

const page = () => {
  // const { mutate, data } = useUserWithId();

  const { data, isLoading, isError } = useUserData();
  const { mutate: updateUser, data: updateInfoData } = useUserInfoUpdate();
  const [bio, setBio] = useState(""); // State to track the bio input value
  const [remainingChars, setRemainingChars] = useState(101); // State to track remaining characters

  const userData = data?.data;

  console.log(updateInfoData);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Function to handle bio input change
  const handleBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBio = e.target.value;
    if (newBio.length <= 101) {
      setBio(newBio);
      setRemainingChars(101 - newBio.length); // Update remaining characters
    }
  };

  // Function to handle bio update submission
  const handleBioUpdate = () => {
    // Create the payload to send to the update function
    const payload = { _id: userData._id, bio };

    // Call the mutation to update the user bio
    updateUser(payload);
  };

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
          <div className="text-center mt-4 flex flex-col items-center">
            {/* User Name */}
            <p className="text-2xl font-bold">{userData?.name}</p>

            {/* User Bio Section */}
            <div className="mt-2 text-center">
              {userData?.bio ? (
                <div className="flex items-center justify-center">
                  {/* Bio Text */}
                  <p className="text-sm text-default-900 max-w-xs mr-2">
                    {userData?.bio}
                  </p>

                  {/* Edit Icon */}
                  <MdEdit
                    className="text-blue-500 cursor-pointer hover:text-blue-800 transition-colors duration-200"
                    size={20}
                    title="Update bio"
                    onClick={onOpen} // Opens the same modal as "Add bio" button
                  />
                </div>
              ) : (
                <Button
                  className="bg-transparent text-blue-500"
                  onPress={onOpen}
                >
                  Add bio
                </Button>
              )}
            </div>

            {/* Modal for Adding/Updating Bio */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      {userData?.bio ? "Update your Bio" : "Add your Bio"}
                    </ModalHeader>
                    <ModalBody>
                      <Input
                        defaultValue={userData?.bio}
                        onChange={handleBioChange}
                      />
                      <p>Characters: {remainingChars} / 101</p>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="danger"
                        variant="light"
                        onPress={onClose}
                        className="mr-2"
                      >
                        Close
                      </Button>
                      <Button
                        color="primary"
                        onClick={handleBioUpdate}
                        onPress={onClose}
                      >
                        Save
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
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
