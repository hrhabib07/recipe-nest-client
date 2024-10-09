// src/components/UserCard.tsx
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

import { useUserInfoUpdate } from "@/src/hooks/user.hook";

type UserCardProps = {
  name: string;
  profilePhoto: string;
  authorId: string;
  followers: any[];
  currentUser: string | undefined;
  postedOn?: string;
};

const UserCard: React.FC<UserCardProps> = ({
  name,
  profilePhoto,
  authorId,
  followers,
  currentUser,
  postedOn,
}) => {
  const { mutate: updateUser, isSuccess, isError } = useUserInfoUpdate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const isMyAccount = currentUser === authorId;

  let isFollowing = false;

  if (Array.isArray(followers) && followers.length > 0) {
    // Check if the first element is a string
    if (typeof followers[0] === "string") {
      // Array of strings: Check if `currentUser` exists in the array
      isFollowing = followers.includes(currentUser);
    }
    // Check if the first element is an object
    else if (typeof followers[0] === "object" && followers[0] !== null) {
      // Array of objects: Use `some` to check if any object matches `currentUser`
      isFollowing = followers.some((follower) => follower?._id === currentUser);
    }
  }

  const handleFollowUser = () => {
    const payload = { _id: authorId, followers: currentUser };

    if (!currentUser) {
      onOpen();
    } else {
      updateUser(payload);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between w-full">
        <div className="flex gap-2">
          {/* Image Container */}
          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 hover:opacity-70">
            <Link href={`/people/${authorId}`}>
              <img
                alt={name}
                className="w-full h-full rounded-full object-cover"
                src={profilePhoto}
              />
            </Link>
          </div>

          {/* Name and Email */}
          <div className="flex-1 overflow-hidden">
            <Link href={`/people/${authorId}`}>
              {/* Name with ellipsis and title for tooltip */}
              <h3
                className="text-lg font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap hover:text-blue-500 hover:underline  "
                title={name} // Tooltip for showing full name
              >
                {name}
              </h3>
            </Link>
            <div className="">
              {!postedOn && (
                <p className="text-default-500">
                  {followers?.length} Followers
                </p>
              )}
              <>
                {postedOn && (
                  <small className="text-default-500">{postedOn}</small>
                )}
              </>
            </div>
          </div>
        </div>
        {/* View Profile Link */}
        <div className="text-end">
          {!isMyAccount && !isFollowing && (
            <button
              className="text-blue-500 cursor-pointer"
              onClick={handleFollowUser}
            >
              Follow
            </button>
          )}
          {!isMyAccount && isFollowing && (
            <p className="text-default-500 cursor-disabled">Following</p>
          )}
        </div>
      </div>
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
    </div>
  );
};

export default UserCard;
