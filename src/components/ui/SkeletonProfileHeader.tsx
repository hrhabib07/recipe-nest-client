import React from "react";

// Skeleton loader component
const SkeletonProfileHeader = () => {
  return (
    <div className="relative">
      {/* Background image skeleton */}
      <div className="w-full h-48 bg-gradient-to-r from-default-200 via-default-300 to-default-200 animate-pulse" />

      {/* Profile Photo and Info skeleton */}
      <div className="flex flex-col justify-center items-center -mt-16 relative">
        {/* Profile Photo skeleton */}
        <div className="w-24 h-24 rounded-full bg-default-300 border-4 border-default shadow-lg animate-pulse" />

        {/* User Name and Bio skeleton */}
        <div className="text-center mt-4 flex flex-col items-center">
          {/* User Name Skeleton */}
          <div className="w-32 h-6 bg-default-300 rounded animate-pulse" />

          {/* User Bio Section Skeleton */}
          <div className="mt-2 text-center flex items-center justify-center">
            <div className="w-48 h-4 bg-default-300 rounded animate-pulse mr-2" />
            <div className="w-12 h-4 bg-default-300 rounded animate-pulse" />
          </div>
        </div>

        {/* Create New Post Button Skeleton */}
        <div className="mt-6 w-40 h-10 bg-default-300 rounded animate-pulse" />
      </div>
    </div>
  );
};

export default SkeletonProfileHeader;
