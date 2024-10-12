"use client";
import React from "react";
import SubscriptionCard from "./SubscriptionCard";

const membershipPlans = [
  {
    type: "Silver",
    price: "$9.99/month",
    description: "Basic membership with access to limited features.",
    features: ["Access to premium content", "Email support"],
    validity: "1 month",
  },
  {
    type: "Gold",
    price: "$19.99/month",
    description: "Standard membership with extra features.",
    features: [
      "Access to premium content",
      "Priority email support",
      "Monthly updates",
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {membershipPlans.map((plan, index) => (
        <SubscriptionCard key={index} plan={plan} />
      ))}
    </div>
  );
};

export default SubscriptionLayout;
