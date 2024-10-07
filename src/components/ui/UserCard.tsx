// src/components/UserCard.tsx
import Link from "next/link";
import React from "react";

type UserCardProps = {
  name: string;
  email: string;
  profilePhoto: string;
  //   bio: string;
  userId: string;
};

const UserCard: React.FC<UserCardProps> = ({
  name,
  email,
  profilePhoto,
  userId,
}) => {
  return (
    <div className="w-96 p-4 bg-gradient-to-b from-default-100 to-default-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex gap-4 text-start items-center">
        {/* Image Container */}
        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 hover:opacity-70">
          <Link href={`/people/${userId}`}>
            <img
              alt={name}
              className="w-full h-full rounded-full object-cover"
              src={profilePhoto}
            />
          </Link>
        </div>

        {/* Name and Email */}
        <div className="flex-1 overflow-hidden">
          <Link href={`/people/${userId}`}>
            {/* Name with ellipsis and title for tooltip */}
            <h3
              className="text-lg font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap hover:text-blue-500 hover:underline  "
              title={name} // Tooltip for showing full name
            >
              {name}
            </h3>
          </Link>

          {/* Email with ellipsis and title for tooltip */}
          <p
            className="text-default-500 font-light overflow-hidden overflow-ellipsis whitespace-nowrap"
            title={email} // Tooltip for showing full email
          >
            {email}
          </p>
        </div>

        {/* View Profile Link */}
        <div className="ml-auto">
          <Link href={`/people/${userId}`}>
            <p className="text-blue-500 cursor-pointer">Follow</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
