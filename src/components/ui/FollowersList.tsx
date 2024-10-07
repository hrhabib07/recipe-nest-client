import React from "react";

const FollowersList = ({ followers, followings }: any) => {
  return (
    <div className="flex gap-2">
      <p className="text-default-500 ">{followers?.length} Followers</p>
      {/* <p className="text-default-500 hover:text-blue-500">
        Followings:{followings?.length}
      </p> */}
    </div>
  );
};

export default FollowersList;
