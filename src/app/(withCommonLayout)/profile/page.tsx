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

const page = () => {
  // const { mutate, data } = useUserWithId();

  const { data, isLoading, isError } = useUserData();
  const { mutate: updateUser, data: updateInfoData } = useUserInfoUpdate();
  const [bio, setBio] = useState(""); // State to track the bio input value
  const [remainingChars, setRemainingChars] = useState(101); // State to track remaining characters

  const userData = data?.data;

  console.log(updateInfoData);
  const {
    isOpen: isOpenBioModal,
    onOpen: onOpenBioModal,
    onOpenChange: onOpenBioModalChange,
  } = useDisclosure();
  const {
    isOpen: isOpenProfileModal,
    onOpen: onOpenProfileModal,
    onOpenChange: onOpenProfileModalChange,
  } = useDisclosure();

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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const payload = { _id: userData?._id, ...data };
    console.log("Inside form user data: ", payload);
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

              {/* Edit Icon */}
              <MdEdit
                className="text-blue-500 cursor-pointer hover:text-blue-800 transition-colors duration-200"
                size={20}
                title="Update bio"
                onClick={onOpenProfileModal} // Opens the same modal as "Add bio" button
              />
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
                  {/* <MdEdit
                    className="text-blue-500 cursor-pointer hover:text-blue-800 transition-colors duration-200"
                    size={20}
                    title="Update bio"
                    onClick={onOpenBioModal} // Opens the same modal as "Add bio" button
                  /> */}
                </div>
              ) : (
                <UpdateBioModal
                  buttonText="Add Bio"
                  userData={userData}
                ></UpdateBioModal>
                // <Button
                //   className="bg-transparent text-blue-500"
                //   onPress={onOpenBioModal}
                // >
                //   Add bio
                // </Button>
              )}
            </div>

            {/* Modal for Adding/Updating Bio */}
            <Modal isOpen={isOpenBioModal} onOpenChange={onOpenBioModalChange}>
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

            {/* Modal for Adding/Updating profile info */}
            <Modal
              isOpen={isOpenProfileModal}
              onOpenChange={onOpenProfileModalChange}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      {userData?.bio
                        ? "Update your profile info"
                        : "Add your profile info"}
                    </ModalHeader>
                    <ModalBody>
                      <RNForm
                        //! Only for development
                        defaultValues={{
                          name: userData.name,
                          email: userData.email,
                          mobileNumber: userData.mobileNumber,
                          profilePhoto: userData.profilePhoto,
                        }}
                        onSubmit={onSubmit} // Make sure to call handleSubmit
                      >
                        <div className="py-3">
                          <RNInput label="Name" name="name" size="sm" />
                        </div>
                        <div className="py-3">
                          <RNInput label="Email" name="email" size="sm" />
                        </div>
                        <div className="py-3">
                          <RNInput
                            label="Mobile Number"
                            name="mobileNumber"
                            size="sm"
                          />
                        </div>
                        <div className="py-3">
                          <RNInput
                            label="Profile photo URL"
                            name="profilePhoto"
                            size="sm"
                          />
                        </div>

                        <Button
                          className="my-3 w-full rounded-md bg-default-900 text-default"
                          size="lg"
                          type="submit"
                          onPress={onClose}
                        >
                          Update
                        </Button>
                      </RNForm>
                    </ModalBody>
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
