"use client";
import { useState, useEffect } from "react";
import { title } from "@/src/components/primitives";
import { useAllUsersData } from "@/src/hooks/user.hook";
import UserCard from "@/src/components/ui/UserCard";
import { Spinner } from "@nextui-org/spinner";
import { Input } from "@nextui-org/input";
import { Span } from "next/dist/trace";

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
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          endContent={
            <span className="text-default-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </span>
          }
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Users List */}
      <div className="grid grid-cols-1 gap-6">
        {isLoading && <Spinner color="default"></Spinner>}
        {isSuccess && data?.data.length < 1 && (
          <p className="my-4 text-lg font-semibold">No user found</p>
        )}

        {data?.data?.map((user: any) => (
          <UserCard
            key={user._id}
            name={user.name}
            email={user.email}
            profilePhoto={user.profilePhoto}
          />
        ))}
      </div>
    </div>
  );
}
