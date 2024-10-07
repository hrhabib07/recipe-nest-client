"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

import { useGetSingleUsersProfileData } from "@/src/hooks/user.hook";
import UsersPostsData from "@/src/components/ui/UsersPostsData";

const page = () => {
  const pathName = usePathname();
  const userId = pathName.split("/").pop();
  const { data } = useGetSingleUsersProfileData(userId as string);
  //   console.log("userData", data?.data);
  const userData = data?.data;

  return (
    <div className="container mx-auto max-w-7xl min-h-screen overflow-hidden shadow-md bg-gradient-to-b from-default-50 relative">
      {/* Cover Photo */}
      <div
        className="w-screen h-48 bg-cover bg-center -mx-6" // Removes side margins to achieve full width
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1512058454905-6b841e7ad132?q=80&w=1995&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      ></div>
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
          </div>

          {/* User Bio Section */}
          <div className="mt-2 text-center">
            <div className="flex items-center justify-center">
              {/* Bio Text */}
              <p className="text-sm text-default-900 max-w-xs mr-2">
                {userData?.bio}
              </p>

              {/* Edit Icon */}
            </div>
          </div>
        </div>
        {/* Create New Post Button */}
      </div>
      <UsersPostsData userId={userData?._id} />
      {/* {userData?.posts?.length > 0 ? (
        <UsersPostsData userId={userData?._id} />
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          No post yet
        </div>
      )} */}
    </div>
  );
};

export default page;
