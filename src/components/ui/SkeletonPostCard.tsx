import React from "react";

// Skeleton loader for PostCard
const SkeletonPostCard = () => {
  return (
    <div className="p-4 bg-gradient-to-b from-default-100 rounded-xl shadow-lg flex flex-col gap-4 animate-pulse">
      {/* Post header skeleton */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-default-200" />
        <div className="flex flex-col gap-2">
          <div className="h-4 w-24 bg-default-200 rounded" />
          <div className="h-3 w-32 bg-default-200 rounded" />
        </div>
      </div>

      {/* Post content skeleton */}
      <div className="flex flex-col gap-2">
        <div className="h-6 w-3/4 bg-default-200 rounded" />
        <div className="h-4 w-full bg-default-200 rounded" />
        <div className="h-4 w-4/5 bg-default-200 rounded" />
        <div className="h-4 w-2/3 bg-default-200 rounded" />
        <div className="my-4 h-56 bg-default-200 rounded-lg" />
      </div>

      {/* Interaction section skeleton */}
      <div className="flex items-center justify-between gap-4">
        <div className="h-4 w-12 bg-default-200 rounded" />
        <div className="h-4 w-12 bg-default-200 rounded" />
        <div className="h-4 w-12 bg-default-200 rounded" />
      </div>
    </div>
  );
};

export default SkeletonPostCard;
