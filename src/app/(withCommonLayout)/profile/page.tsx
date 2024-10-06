/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Image from "next/image";

import { useUserData } from "@/src/hooks/auth.hook";
import UpdateBioModal from "@/src/components/ui/UpdateBioModal";
import UpdateProfileModal from "@/src/components/ui/UpdateProfileModal";
import CreatePostModal from "@/src/components/ui/createPostModal";
import SkeletonProfileHeader from "@/src/components/ui/SkeletonProfileHeader";
import UsersPostsData from "@/src/components/ui/UsersPostsData";

const page = () => {
  const { data, isLoading, isError } = useUserData();
  const userData = data?.data;

  // const { data: postsData, isLoading: isPostsDataLoading } = getAllPostData();
  // const { data: postsData, isLoading: isPostsDataLoading } =
  //   useGetPostDataWithQuery(`user=${userData._id}`);
  // const posts = postsData?.data;
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
          </div>
          {/* Create New Post Button */}
          <div className="mt-6">
            <CreatePostModal />
          </div>
        </div>
        {/* ALl posts container */}
        {/* <AllPosts></AllPosts> */}
        <UsersPostsData userId={userData._id} />
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {posts?.map((post: any) => <PostCard key={post._id} post={post} />)}
        </div> */}
      </div>
    </>
  );
};

export default page;
