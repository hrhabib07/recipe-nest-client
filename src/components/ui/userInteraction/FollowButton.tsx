"use client";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import Link from "next/link";
import React from "react";

import { useUnfollowUser, useUserInfoUpdate } from "@/src/hooks/user.hook";
import { useUser } from "@/src/context/user.provider";

const FollowButton = ({
  userId,
  followers,
}: {
  userId: string;
  followers: any[];
}) => {
  const { user, setIsLoading: userLoading } = useUser();
  const { mutate: updateUser, isSuccess, isError } = useUserInfoUpdate();
  const {
    mutate: unfollowUser,
    isSuccess: unfollowSuccess,
    isError: unfollowError,
  } = useUnfollowUser();
  const currentLoggedInUserId = user?._id;
  const isMyAccount = currentLoggedInUserId === userId;

  let isFollowing = false;

  if (Array.isArray(followers) && followers.length > 0) {
    // Check if the first element is a string
    if (typeof followers[0] === "string") {
      // Array of strings: Check if `currentUser` exists in the array
      isFollowing = followers.includes(currentLoggedInUserId);
    }
    // Check if the first element is an object
    else if (typeof followers[0] === "object" && followers[0] !== null) {
      // Array of objects: Use `some` to check if any object matches `currentUser`
      isFollowing = followers.some(
        (follower) => follower?._id === currentLoggedInUserId,
      );
    }
  }
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenUnfollowModal,
    onOpen: onOpenUnfollowModal,
    onOpenChange: onOpenChangeUnfollowModal,
  } = useDisclosure();
  const handleFollowUser = () => {
    const payload = { _id: userId, followers: currentLoggedInUserId };

    if (!currentLoggedInUserId) {
      onOpen();
    } else {
      updateUser(payload);
    }
  };
  const handleUnfollowUser = () => {
    onOpenChangeUnfollowModal();
    // unfollowUser();
  };

  const handleUnfollowButton = () => {
    const payload = { _id: userId, follower: currentLoggedInUserId };

    unfollowUser(payload);
    // onClose();
  };

  console.log("isFOllowing", isFollowing);

  return (
    <>
      {!isMyAccount && !isFollowing && (
        <button
          className="text-blue-500 hover:text-blue cursor-pointer  hover:underline"
          onClick={handleFollowUser}
        >
          follow
        </button>
      )}
      {!isMyAccount && isFollowing && (
        <button
          className="text-red-500 hover:text-re-600 cursor-pointer  hover:underline"
          onClick={handleUnfollowUser}
        >
          unfollow
        </button>
      )}

      {/* unfollow user modal */}
      <>
        {/* <Button onPress={onOpen}>Open Modal</Button> */}
        <Modal
          className="bg-gradient-to-b from-default-100 shadow-lg"
          isOpen={isOpenUnfollowModal}
          onOpenChange={onOpenChangeUnfollowModal}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Are sure you are going to unfollow this user?
                </ModalHeader>
                <ModalBody>
                  <p>
                    Please make sure you are going to unfollow this user. Would
                    you like to Unfollow this user?
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onClick={handleUnfollowButton}
                    onPress={onClose}
                  >
                    Unfollow
                  </Button>
                  {/* <Link href="/login"> */}
                  <Button color="primary" onPress={onClose}>
                    Close{" "}
                  </Button>
                  {/* </Link> */}
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
      {/* modal for unknown users */}
      <>
        {/* <Button onPress={onOpen}>Open Modal</Button> */}
        <Modal
          className="bg-gradient-to-b from-default-100 shadow-lg"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  You need to be logged in!
                </ModalHeader>
                <ModalBody>
                  <p>
                    Please log in to interact. Would you like to be redirected
                    to the login page?
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Link href="/login">
                    <Button color="primary" onPress={onClose}>
                      Login
                    </Button>
                  </Link>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </>
  );
};

export default FollowButton;
