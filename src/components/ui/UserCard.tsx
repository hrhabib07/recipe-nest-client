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
import { useUser } from "@/src/context/user.provider";

type UserCardProps = {
  name: string;
  email: string;
  profilePhoto: string;
  //   bio: string;
  userId: string;
  followers: any[];
  following: string[];
};

const UserCard: React.FC<UserCardProps> = ({
  name,
  email,
  profilePhoto,
  userId,
  followers,
  following,
}) => {
  const { user, setIsLoading: userLoading } = useUser();
  const { mutate: updateUser, isSuccess, isError } = useUserInfoUpdate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const currentLoggedInUserId = user?._id;
  const isMyAccount = currentLoggedInUserId === userId;
  // const isFollowing = followers?.includes(currentLoggedInUserId as string);
  const isFollowing =
    followers?.some((follower) => follower?._id === currentLoggedInUserId) ||
    false;

  const handleFollowUser = () => {
    const payload = { _id: userId, followers: currentLoggedInUserId };

    if (!currentLoggedInUserId) {
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
            <Link href={`/people/${userId}`}>
              <img
                alt={name}
                className="w-full h-full rounded-full object-cover"
                src={profilePhoto}
              />
            </Link>
          </div>

          {/* Name and Email */}
          <div className="flex-1 overflow-hidden">
            <Link href={`/people/${userId}`}>
              {/* Name with ellipsis and title for tooltip */}
              <h3
                className="text-lg font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap hover:text-blue-500 hover:underline  "
                title={name} // Tooltip for showing full name
              >
                {name}
              </h3>
            </Link>
            <div className="flex gap-2">
              <p className="text-default-500 ">{followers?.length} Followers</p>
            </div>
          </div>
        </div>
        {/* View Profile Link */}
        <div className="mx-auto w-full text-end">
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
