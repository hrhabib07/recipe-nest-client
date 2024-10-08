import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import React, { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button } from "@nextui-org/button";
import { MdEdit } from "react-icons/md";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import RNInput from "../form/RNInput";
import RNForm from "../form/RNForm";

import { useUserInfoUpdate } from "@/src/hooks/user.hook";

// Define the Zod schema for form validation
const profileSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email format" }),
  mobileNumber: z.string().min(1, { message: "Mobile number is required" }),
  profilePhoto: z
    .string()
    .url({ message: "Please provide a valid URL" }) // Validate the URL format
    .optional(), // You can make this field optional if needed
});

const UpdateProfileModal = ({ userData }: any) => {
  const { mutate: updateUser, isSuccess, isError } = useUserInfoUpdate();
  const {
    isOpen: isOpenProfileModal,
    onOpen: onOpenProfileModal,
    onOpenChange: onOpenProfileModalChange,
  } = useDisclosure();

  const [isSubmitting, setIsSubmitting] = useState(false); // State to track submission status

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsSubmitting(true);
    const payload = { _id: userData?._id, ...data };

    updateUser(payload, {
      onSuccess: () => {
        setIsSubmitting(false);
        onOpenProfileModalChange(); // Close the modal on success
      },
      onError: () => {
        setIsSubmitting(false);
        // Handle error (optional)
      },
    });
  };

  return (
    <>
      {/* Edit Button */}
      <MdEdit
        className="text-blue-500 cursor-pointer hover:text-blue-800 transition-colors duration-200"
        size={20}
        title="Update bio"
        onClick={onOpenProfileModal} // Opens the same modal as "Add bio" button
      />

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
                  resolver={zodResolver(profileSchema)} // Use Zod resolver for validation
                  onSubmit={onSubmit}
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
                    isLoading={isSubmitting} // Show loading state during submission
                    size="lg"
                    type="submit"
                  >
                    {isSubmitting ? "Updating..." : "Update"}
                  </Button>
                </RNForm>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateProfileModal;
