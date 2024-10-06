// src/components/UserCard.tsx
import React from "react";

type UserCardProps = {
  name: string;
  email: string;
  profilePhoto: string;
  //   bio: string;
};

const UserCard: React.FC<UserCardProps> = ({ name, email, profilePhoto }) => {
  return (
    <div className="p-4  bg-gradient-to-b from-default-100 to-default-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex backdrop-blur-sm gap-4 text-start">
        <img
          src={profilePhoto}
          alt={name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="w-3/4 overflow-ellipsis">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-default-500 font-light">{email}</p>
          {/* <p
            className="backdrop-blur-sm opacity-50 transition-all duration-1000 delay-5"
            onMouseEnter={(e) => {
              e.currentTarget.classList.remove("blur-sm", "opacity-50");
              e.currentTarget.classList.add("blur-none", "opacity-100");
            }}
          >
            {email}
          </p> */}
        </div>
        <div className="">
          <p className="text-blue-500 cursor-pointer">view profile</p>
        </div>
      </div>
      {/* {bio && <p className="mt-2 text-sm">{bio}</p>} */}
    </div>
  );
};

export default UserCard;
