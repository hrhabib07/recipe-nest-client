"use client";
import React from "react";
import { format, isBefore } from "date-fns";

import LoadingSpinner from "../LoadingSpinner";

import SubscriptionCard from "./SubscriptionCard";

import { useGetSingleUsersProfileData } from "@/src/hooks/user.hook";
import { useUser } from "@/src/context/user.provider";

const membershipPlans = [
  {
    type: "Silver",
    price: "$0.99/Day",
    description: "Basic membership with access to limited features. To try out",
    features: [
      "Access to premium content",
      "Email support",
      "Daily updates",
      "Special discount",
    ],
    validity: "1 day",
  },
  {
    type: "Gold",
    price: "$19.99/month",
    description: "Standard membership with extra features.",
    features: [
      "Access to premium content",
      "Priority email support",
      "Monthly updates",
      "Special discount",
    ],
    validity: "1 month",
  },
  {
    type: "Platinum",
    price: "$29.99/month",
    description: "Exclusive membership with all features unlocked.",
    features: [
      "Access to all content",
      "24/7 support",
      "Exclusive deals",
      "Weekly updates",
    ],
    validity: "1 month",
  },
  {
    type: "Diamond",
    price: "$49.99/month",
    description: "VIP membership with the highest privileges.",
    features: [
      "VIP access to all content",
      "Dedicated account manager",
      "24/7 VIP support",
      "Exclusive events",
    ],
    validity: "1 month",
  },
];

const SubscriptionLayout = () => {
  const { user } = useUser();
  const userId = user?._id;
  const { data: currentUserFullInfo, isLoading } = useGetSingleUsersProfileData(
    userId as string,
  );
  const validityOfSubs = currentUserFullInfo?.data?.subscription?.validUntil;

  // Check if the subscription is expired
  const isSubscriptionValid =
    validityOfSubs && !isBefore(new Date(validityOfSubs), new Date());

  return (
    <div className="min-w-full flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-10">
      {isLoading && <LoadingSpinner />}
      {!isSubscriptionValid ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
          {membershipPlans.map((plan, index) => (
            <SubscriptionCard key={index} plan={plan} />
          ))}
        </div>
      ) : (
        <div className="max-w-5xl text-center bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Subscription Active
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            You have a valid subscription until:
          </p>
          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {format(new Date(validityOfSubs), "MMMM d, yyyy hh:mm a")}
          </p>
        </div>
      )}
    </div>
  );
};

export default SubscriptionLayout;
