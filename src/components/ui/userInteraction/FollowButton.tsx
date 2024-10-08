import { useUser } from "@/src/context/user.provider";
import { useUserInfoUpdate } from "@/src/hooks/user.hook";
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

const FollowButton = ({
  userId,
  followers,
}: {
  userId: string;
  followers: any[];
}) => {
  const { user, setIsLoading: userLoading } = useUser();
  const { mutate: updateUser, isSuccess, isError } = useUserInfoUpdate();
  const currentLoggedInUserId = user?._id;
  const isMyAccount = currentLoggedInUserId === userId;
  // let resultIsFollowing: boolean;
  const isFollowing =
    followers?.some((follower) => follower?._id === currentLoggedInUserId) ||
    false;
  // console.log(isFollowing);
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
    // const payload = { _id: userId, followers: currentLoggedInUserId };

    onOpenUnfollowModal();
    // if (!currentLoggedInUserId) {
    // } else {
    //   // updateUser(payload);
    // }
  };

  return (
    <>
      {!isMyAccount && !isFollowing && (
        <p
          className="text-blue-500 hover:text-blue cursor-pointer  hover:underline"
          onClick={handleFollowUser}
        >
          follow
        </p>
      )}
      {!isMyAccount && isFollowing && (
        <p
          className="text-red-500 hover:text-re-600 cursor-pointer  hover:underline"
          onClick={handleUnfollowUser}
        >
          unfollow
        </p>
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
                  <Button color="danger" variant="light" onPress={onClose}>
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
