/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Image from "next/image";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import Link from "next/link";
import { Button } from "@nextui-org/button";

import { useUserData } from "@/src/hooks/auth.hook";
import UpdateBioModal from "@/src/components/ui/UpdateBioModal";
import UpdateProfileModal from "@/src/components/ui/UpdateProfileModal";
import CreatePostModal from "@/src/components/ui/createPostModal";
import SkeletonProfileHeader from "@/src/components/ui/SkeletonProfileHeader";
import ChangePasswordModal from "@/src/components/ui/ChangePasswordModal";
import UserProfilePostData from "@/src/components/ui/UserProfilePostData";

const page = () => {
  const { data, isLoading } = useUserData();
  const userData = data?.data;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenFollowingModal,
    onOpen: onOpenFollowingModal,
    onOpenChange: onOpenChangeFollowingModal,
  } = useDisclosure();
  const handleDisplayFollowers = () => {
    onOpen();
  };
  const handleDisplayFollowing = () => {
    onOpenFollowingModal();
  };
  // console.log(userData?.followers);

  const hasFollowers = userData?.followers?.length > 0;
  const hasFollowing = userData?.following?.length > 0;

  if (isLoading) {
    return <SkeletonProfileHeader />;
  }

  return (
    <>
      <div className="w-full  overflow-hidden shadow-md bg-gradient-to-b from-default-50 relative">
        {/* Cover Photo */}
        <div
          className="w-full h-48 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1512058454905-6b841e7ad132?q=80&w=1995&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        >
          {/* <div className="absolute inset-0 bg-black bg-opacity-30"></div> */}
        </div>
        {/* Profile Photo and Info */}
        <div className="flex flex-col justify-center items-center -mt-16 relative">
          {/* Profile Photo */}
          <Image
            alt="User profile photo"
            className="rounded-full border-4 border-default shadow-lg size-28"
            height={96}
            src={
              userData?.profilePhoto ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
            width={96}
          />

          {/* User Name and Bio */}
          <div className="text-center mt-4 flex flex-col items-center">
            {/* User Name */}
            <div className="flex items-center justify-center">
              {/* Bio Text */}
              <p className="text-2xl font-bold  me-2">{userData?.name}</p>

              <UpdateProfileModal userData={userData} />
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
                  <UpdateBioModal buttonText="update" userData={userData} />
                </div>
              ) : (
                <UpdateBioModal buttonText="Add Bio" userData={userData} />
              )}
            </div>
            <div className="flex gap-2 my-2">
              <button onClick={handleDisplayFollowers}>
                <p className="text-default-500 hover:text-blue-500 cursor-pointer">
                  {userData?.followers?.length} Followers
                </p>{" "}
              </button>
              <button onClick={handleDisplayFollowing}>
                <p className="text-default-500 hover:text-blue-500">
                  {userData?.following?.length} Following
                </p>
              </button>
            </div>
          </div>
          {/* Create New Post Button */}
          <div className="mt-6">
            <CreatePostModal />
          </div>
          <div className="mt-6">
            <ChangePasswordModal />
          </div>
        </div>
        <UserProfilePostData userId={userData._id} />
        {/* <UsersPostsData userId={userData._id} /> */}
        {/* followers list modal  */}
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
                    {hasFollowers && `Followers of ${userData.name}`}
                  </ModalHeader>
                  <ModalBody>
                    {!hasFollowers && `${userData.name} has 0 Followers`}
                    {hasFollowers &&
                      userData?.followers?.map(
                        (
                          follower: any,
                          index: React.Key | null | undefined,
                        ) => (
                          <div
                            key={index}
                            className="w-96 p-4 bg-gradient-to-b from-default-100 to-default-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                          >
                            <div className="flex gap-4 text-start items-center">
                              {/* Image Container */}
                              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 hover:opacity-70">
                                <Link href={`/people/${follower._id}`}>
                                  <img
                                    alt={follower?.name}
                                    className="w-full h-full rounded-full object-cover"
                                    src={follower?.profilePhoto}
                                  />
                                </Link>
                              </div>

                              {/* Name and Email */}
                              <div className="flex-1 overflow-hidden">
                                <div>
                                  <Link href={`/people/${follower._id}`}>
                                    {/* Name with ellipsis and title for tooltip */}
                                    <h3
                                      className="text-lg font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap hover:text-blue-500 hover:underline  "
                                      title={follower?.name} // Tooltip for showing full name
                                    >
                                      {follower?.name}
                                    </h3>
                                  </Link>
                                  <div className="flex gap-2">
                                    <p className="text-default-500 ">
                                      {follower?.followers?.length} Followers
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ),
                      )}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
        {/* following list modal */}
        <>
          {/* <Button onPress={onOpen}>Open Modal</Button> */}
          <Modal
            className="bg-gradient-to-b from-default-100 shadow-lg"
            isOpen={isOpenFollowingModal}
            onOpenChange={onOpenChangeFollowingModal}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    {/* {userData.name} is Following */}
                    {hasFollowing && `${userData.name} is Following`}
                  </ModalHeader>
                  <ModalBody>
                    {!hasFollowing &&
                      `${userData.name} is Not following anyone`}
                    {hasFollowing &&
                      userData?.following?.map((following: any, index: any) => (
                        <div
                          key={index}
                          className="w-96 p-4 bg-gradient-to-b from-default-100 to-default-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex gap-4 text-start items-center">
                            {/* Image Container */}
                            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 hover:opacity-70">
                              <Link href={`/people/${following._id}`}>
                                <img
                                  alt={following?.name}
                                  className="w-full h-full rounded-full object-cover"
                                  src={following?.profilePhoto}
                                />
                              </Link>
                            </div>

                            {/* Name and Email */}
                            <div className="flex-1 overflow-hidden">
                              <Link href={`/people/${following._id}`}>
                                {/* Name with ellipsis and title for tooltip */}
                                <h3
                                  className="text-lg font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap hover:text-blue-500 hover:underline  "
                                  title={following?.name} // Tooltip for showing full name
                                >
                                  {following?.name}
                                </h3>
                              </Link>
                              <div className="flex gap-2">
                                <p className="text-default-500 ">
                                  {following?.followers?.length} Followers
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Link href="/login">
                      <Button
                        className="hidden"
                        color="primary"
                        onPress={onClose}
                      >
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
    </>
  );
};

export default page;
