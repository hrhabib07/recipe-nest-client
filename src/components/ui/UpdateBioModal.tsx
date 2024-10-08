import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import React, { useState } from "react";
import { MdEdit } from "react-icons/md";

import { useUserInfoUpdate } from "@/src/hooks/user.hook";

const UpdateBioModal = ({
  buttonText,
  userData,
}: {
  buttonText: string;
  userData: any;
}) => {
  // const { mutate, data } = useUserWithId();

  const { mutate: updateUser, data: updateInfoData } = useUserInfoUpdate();
  const [bio, setBio] = useState(""); // State to track the bio input value
  const [remainingChars, setRemainingChars] = useState(101); // State to track remaining characters

  // console.log(updateInfoData);
  const {
    isOpen: isOpenBioModal,
    onOpen: onOpenBioModal,
    onOpenChange: onOpenBioModalChange,
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

  return (
    <>
      {buttonText === "update" ? (
        <MdEdit
          className="text-blue-500 cursor-pointer hover:text-blue-800 transition-colors duration-200"
          size={20}
          title="Update bio"
          onClick={onOpenBioModal} // Opens the same modal as "Add bio" button
        />
      ) : (
        <Button
          className="bg-transparent  text-blue-500"
          onPress={onOpenBioModal}
        >
          {buttonText}
        </Button>
      )}
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
                  className="mr-2"
                  color="danger"
                  variant="light"
                  onPress={onClose}
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
    </>
  );
};

export default UpdateBioModal;
