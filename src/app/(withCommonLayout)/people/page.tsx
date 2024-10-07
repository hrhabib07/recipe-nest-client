"use client";
import { useState, useEffect } from "react";
import { Spinner } from "@nextui-org/spinner";
import { Input } from "@nextui-org/input";

import { useAllUsersData } from "@/src/hooks/user.hook";
import UserCard from "@/src/components/ui/UserCard";

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
  const { data, refetch, isLoading, isSuccess } = useAllUsersData(searchTerm); // Use the hook and pass the search term

  // Refetch data whenever searchTerm changes
  useEffect(() => {
    if (searchTerm || searchTerm === "") {
      refetch(); // Refetch the data manually when searchTerm changes
    }
  }, [searchTerm, refetch]);

  return (
    <div className="max-w-8xl mx-auto px-4 py-8">
      {/* <h1 className={title()}>User Profiles</h1> */}

      {/* Search Bar */}
      <div className="my-8 w-8xl">
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
          placeholder="Search by name or email"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Users List */}
      <div className="grid grid-cols-1 gap-6">
        {isLoading && <Spinner color="default" />}
        {isSuccess && data?.data.length < 1 && (
          <p className="my-4 text-lg font-semibold">No user found</p>
        )}

        {data?.data?.map((user: any) => (
          <UserCard
            key={user._id}
            email={user.email}
            name={user.name}
            profilePhoto={user.profilePhoto}
            userId={user._id}
          />
        ))}
      </div>
    </div>
  );
}
