"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { loadStripe } from "@stripe/stripe-js";
import { envConfig } from "@/src/config/envConfig";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

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

const SubscriptionCard = ({ plan }: SubscriptionCardProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const stripe = await stripePromise;

    // Call your backend to create the checkout session
    const response = await fetch(
      `${envConfig.baseApi}/stripe/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price: parseFloat(plan.price.replace(/[^0-9.-]+/g, "")), // Strip $ sign and convert to number
          membershipType: plan.type,
          email: "mdhabibur.hr7@gmail.com",
        }),
      }
    );

    if (!response.ok) {
      console.error("Failed to create checkout session", response.statusText);
      setLoading(false);
      return; // Exit if there's an error
    }

    const session = await response.json();
    const sessionData = session.data;

    // Check if the session has a valid id
    if (!sessionData.sessionId) {
      console.error("Session ID is missing", sessionData);
      setLoading(false);
      return; // Exit if there's no session ID
    }

    // Redirect to Stripe Checkout
    const { error } = await stripe!.redirectToCheckout({
      sessionId: sessionData.sessionId, // Use the session ID returned from your backend
    });
    if (error) {
      console.error("Stripe checkout error", error);
    } else {
      // Optionally, redirect to a success page after checkout
      router.push("/success"); // Change this to your success page URL
    }
    setLoading(false);
  };
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
        <div className="min-h-44">
          <p className="text-sm mt-4">{plan.description}</p>
          <ul className="list-disc pl-5 mt-4 space-y-1">
            {plan.features.map((feature, index) => (
              <li key={index} className="text-sm text-default-500">
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <Button
            onClick={handleCheckout}
            disabled={loading}
            className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
            size="lg"
            type="submit"
          >
            {loading ? "Processing..." : "Buy Now"}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default SubscriptionCard;
