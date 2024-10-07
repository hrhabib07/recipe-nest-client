import React from "react";

const FollowersList = ({ followers, followings }: any) => {
  return (
    <div>
      <h2>Followers:{followers?.length}</h2>
      <h2>Followings:{followings?.length}</h2>
    </div>
  );
};

export default FollowersList;
