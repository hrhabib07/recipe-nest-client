"use client";
import React, { useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { isBefore } from "date-fns";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
} from "@nextui-org/react";
import Link from "next/link";

import PostCard from "./PostCard";
import SkeletonPostCard from "./SkeletonPostCard";

import { useAllPostData } from "@/src/hooks/post.hook";
import { useUser } from "@/src/context/user.provider";
import { useGetSingleUsersProfileData } from "@/src/hooks/user.hook";
import CreatePostModal from "./createPostModal";

const AllPosts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [contentType, setContentType] = useState("Free");
  const [isOpen, setIsOpen] = useState(false); // Modal state
  const [redirectLink, setRedirectLink] = useState("/login"); // Default redirect to login

  const { user } = useUser();
  const userId = user?._id;

  useEffect(() => {}, [userId]);
  // Only call the hook if userId exists and is valid
  const { data: currentUserFullInfo, isLoading: userDataLoading } =
    useGetSingleUsersProfileData(userId as string);

  const validityOfSubs = currentUserFullInfo?.data?.subscription?.validUntil;

  const isSubscriptionValid = useMemo(() => {
    return (
      (validityOfSubs && !isBefore(new Date(validityOfSubs), new Date())) ||
      false
    );
  }, [validityOfSubs]);

  // console.log(isSubscriptionValid);
  // console.log(validityOfSubs);

  const isUserLoggedIn = !!user;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useAllPostData(searchTerm, contentType);

  const posts = data?.pages.flatMap((page: { data: any }) => page.data) || [];

  const handleContentTypeChange = (e: any) => {
    const selectedContentType = e.target.value;

    if (selectedContentType === "Premium") {
      if (!isUserLoggedIn) {
        setRedirectLink("/login");
        setIsOpen(true);

        return;
      } else if (!isSubscriptionValid) {
        setRedirectLink("/pricing");
        setIsOpen(true);

        return;
      }
    }

    setContentType(selectedContentType);
  };
  const images = [
    "https://res.cloudinary.com/daqvhd097/image/upload/v1732785607/7_shpfwg.png",
    "https://res.cloudinary.com/daqvhd097/image/upload/v1732785607/8_ucmdzm.png",
    "https://res.cloudinary.com/daqvhd097/image/upload/v1732785607/5_ugxqhe.png",
    "https://res.cloudinary.com/daqvhd097/image/upload/v1732785607/3_dqpbr2.png",
    "https://res.cloudinary.com/daqvhd097/image/upload/v1732785607/1_uowlng.png",
    "https://res.cloudinary.com/daqvhd097/image/upload/v1732785607/6_oayfra.png",
    "https://res.cloudinary.com/daqvhd097/image/upload/v1732785607/4_zyluil.png",
    "https://res.cloudinary.com/daqvhd097/image/upload/v1732785607/2_jtmhvm.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to move to the next image
  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Automatically transition to the next image every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextImage, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);
  // const [currentIndex, setCurrentIndex] = useState(0);

  // const nextImage = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === images.length - 1 ? 0 : prevIndex + 1
  //   );
  // };

  // const prevImage = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === 0 ? images.length - 1 : prevIndex - 1
  //   );
  // };

  return (
    <>
      {/* Post cards display */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Advertisement Section */}
          <div className="hidden lg:block p-4 rounded shadow">
            <h3 className="text-lg font-bold">Sponsored Ads</h3>
            <div className="mt-4">
              <div className="mb-4">
                <div className="h-36 bg-default-200 rounded-lg animate-pulse" />
                <p className="text-sm text-default-600 mt-2">
                  Loading advertisement details...
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-2 mx-12">
            {/* Search and Filter Content Bar */}
            <div className="flex justify-end items-end p-4 lg:me-8 gap-2">
              {/* Search Bar Skeleton */}
              <div className="my-8 w-96">
                <div className="h-12 bg-default-200 rounded-lg animate-pulse" />
              </div>
              {/* Content Type Filter Skeleton */}
              <div className="my-8 w-48">
                <div className="h-12 bg-default-200 rounded-lg animate-pulse" />
              </div>
            </div>

            {/* Skeleton Post Cards Section */}
            <div className="grid grid-cols-1  gap-6">
              {Array.from({ length: 9 }, (_, index) => (
                <SkeletonPostCard key={index} />
              ))}
            </div>
          </div>

          {/* Features Section */}
          <div className="hidden lg:block p-4 rounded shadow">
            <h3 className="text-lg font-bold">Features</h3>
            <ul className="mt-4 space-y-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <li key={index} className="text-sm text-default-700">
                  <div className="h-4 bg-default-200 rounded w-3/4 animate-pulse" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Advertisement Section */}
            <div className="hidden lg:block p-4 rounded shadow">
              <h3 className="text-lg font-bold">Sponsored Ads</h3>
              <div className="mt-4">
                <div className="mb-4">
                  <div className="relative w-full max-w-4xl mx-auto">
                    <div className="overflow-hidden">
                      <img
                        src={images[currentIndex]}
                        alt={`carousel image ${currentIndex}`}
                        className="w-full h-auto transition-all duration-500"
                      />
                    </div>

                    {/* Indicator dots */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentIndex(index)}
                          className={`h-2 w-2 rounded-full bg-white ${
                            currentIndex === index
                              ? "bg-opacity-100"
                              : "bg-opacity-50"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-default-600 mt-2">
                    Let's build something great together!
                  </p>
                </div>
              </div>
            </div>

            <div className="col-span-2 mx-12">
              {/* search and filter content bar */}
              {/* <div>
               
                <div className="mt-6">
                  <CreatePostModal />
                </div>
              </div> */}
              <div className="flex justify-center gap-2 items-center">
                {/* Search Bar */}
                <div className="my-8 w-96 justify-end">
                  <Input
                    endContent={
                      <span className="text-default-400">
                        <svg
                          className="size-6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    }
                    label="Search"
                    style={{ width: "100%" }} // Set width to 100% or a fixed value
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                {/* Content Type Filter */}
                <div className="my-8 w-48 justify-end">
                  {isLoading ? (
                    <Select
                      className="animate-pulse"
                      disabled
                      label="Content Type"
                      style={{ width: "100%" }} // Set width to 100% or a fixed value
                    >
                      <SelectItem
                        key={"loading"}
                        value={"loading"}
                        className="text-default-400"
                      >
                        loading...
                      </SelectItem>
                    </Select>
                  ) : (
                    <Select
                      label="Content Type"
                      style={{ width: "100%" }} // Set width to 100% or a fixed value
                      value={contentType}
                      onChange={handleContentTypeChange}
                    >
                      <SelectItem key="Free" value="Free">
                        Free
                      </SelectItem>
                      <SelectItem key="Premium" value="Premium">
                        Premium
                      </SelectItem>
                    </Select>
                  )}
                </div>
              </div>

              {/* Main Content Section */}
              <InfiniteScroll
                dataLength={posts.length}
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>No more posts to display!</b>
                  </p>
                }
                hasMore={!!hasNextPage}
                loader={<h4>Loading more posts...</h4>}
                next={fetchNextPage}
              >
                <div className="grid grid-cols-1 gap-4">
                  {posts.map((post: any) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </div>
              </InfiniteScroll>
            </div>

            {/* Features Section */}
            <div className="hidden lg:block p-4 rounded shadow">
              <h3 className="text-lg font-bold mb-4">Features</h3>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <div className="text-primary text-xl">
                    📸 {/* Replace with a suitable icon component */}
                  </div>
                  <p className="text-sm text-default-700">
                    <span className="font-semibold">Photo Sharing:</span> Share
                    moments with your friends and family.
                  </p>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="text-primary text-xl">
                    💬 {/* Replace with a suitable icon component */}
                  </div>
                  <p className="text-sm text-default-700">
                    <span className="font-semibold">Messaging:</span> Stay
                    connected through private or group chats.
                  </p>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="text-primary text-xl">
                    🎥 {/* Replace with a suitable icon component */}
                  </div>
                  <p className="text-sm text-default-700">
                    <span className="font-semibold">Video Stories:</span> Share
                    your daily highlights in video format.
                  </p>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="text-primary text-xl">
                    ⭐ {/* Replace with a suitable icon component */}
                  </div>
                  <p className="text-sm text-default-700">
                    <span className="font-semibold">Post Reactions:</span> React
                    to posts with likes, loves, and more.
                  </p>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="text-primary text-xl">
                    📌 {/* Replace with a suitable icon component */}
                  </div>
                  <p className="text-sm text-default-700">
                    <span className="font-semibold">Saved Posts:</span> Bookmark
                    posts to revisit later.
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {isFetchingNextPage && <h4>Loading more...</h4>}
        </>
      )}

      {/* Modal for login or subscription */}
      <Modal
        className="bg-gradient-to-b from-default-100 shadow-lg"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {redirectLink === "/login"
                  ? "You need to be logged in!"
                  : "Subscription Required"}
              </ModalHeader>
              <ModalBody>
                {redirectLink === "/login" ? (
                  <p>
                    Please log in to interact. Would you like to be redirected
                    to the login page?
                  </p>
                ) : (
                  <p>
                    You need a valid subscription to view premium content. Would
                    you like to be redirected to the pricing page?
                  </p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Link href={redirectLink}>
                  <Button color="primary" onPress={onClose}>
                    {redirectLink === "/login" ? "Login" : "Go to Pricing"}
                  </Button>
                </Link>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AllPosts;
