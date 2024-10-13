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

  return (
    <>
      {/* search and filter content bar */}
      <div className="flex justify-end items-end p-4 lg:me-8 gap-2">
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
            <Spinner />
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

      {/* Post cards display */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {Array.from({ length: 9 }, (_, index) => (
            <SkeletonPostCard key={index} />
          ))}
        </div>
      ) : (
        <>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {posts.map((post: any) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </InfiniteScroll>

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
