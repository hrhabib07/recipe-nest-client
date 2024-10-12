"use client";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

import React from "react";

interface MembershipPlan {
  type: string;
  price: string;
  description: string;
  features: string[];
  validity: string;
}

interface SubscriptionCardProps {
  plan: MembershipPlan;
}

const SubscriptionCard = ({ plan }) => {
  return (
    <Card className="py-4 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold text-gray-500">
          {plan.type} Membership
        </p>
        <small className="text-default-500">{plan.validity}</small>
        <h4 className="font-bold text-xl">{plan.price}</h4>
      </CardHeader>

      <CardBody className="py-4">
        <Image
          alt={`${plan.type} Membership`}
          className="object-cover rounded-xl"
          src="https://nextui.org/images/hero-card-complete.jpeg" // You can replace this with your specific images
          width={270}
        />
        <p className="text-sm mt-4">{plan.description}</p>
        <ul className="list-disc pl-5 mt-4 space-y-1">
          {plan.features.map((feature, index) => (
            <li key={index} className="text-sm text-gray-600">
              {feature}
            </li>
          ))}
        </ul>
        <div className="flex justify-end mt-6">
          <Button className="bg-blue-500 text-white hover:bg-blue-600">
            Buy Now
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default SubscriptionCard;
