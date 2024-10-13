// components/SubscriptionCard.tsx
"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";
import {
  Card,
  CardHeader,
  CardBody,
  Modal,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useUser } from "@/src/context/user.provider";
import { useCreateCheckoutSession } from "@/src/hooks/payment.hook";
import { envConfig } from "@/src/config/envConfig";

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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { user } = useUser();
  const isUserLoggedIn = !!user?.email;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { mutate: createSession } = useCreateCheckoutSession();

  const handleCheckout = async () => {
    if (!isUserLoggedIn) {
      onOpen();
    } else {
      setLoading(true);
      const stripe = await stripePromise;
      // Use react-query to create the checkout session
      createSession(
        {
          price: parseFloat(plan.price.replace(/[^0-9.-]+/g, "")), // Strip $ sign and convert to number
          email: user.email,
        },
        {
          onSuccess: async (sessionData) => {
            const sessionId = sessionData.data?.sessionId;

            // Check if the session has a valid id
            if (!sessionId) {
              console.error("Session ID is missing", sessionData);
              setLoading(false);
              return; // Exit if there's no session ID
            }

            // Redirect to Stripe Checkout
            const { error } = await stripe!.redirectToCheckout({
              sessionId, // Use the session ID returned from your backend
            });

            if (error) {
              console.error("Stripe checkout error", error);
            } else {
              // Optionally, redirect to a success page after checkout
              router.push("/success"); // Change this to your success page URL
            }
            setLoading(false);
          },
          onError: () => {
            setLoading(false);
          },
        }
      );
    }
  };

  return (
    <>
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
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              disabled={loading}
              size="lg"
              type="submit"
              onClick={handleCheckout}
            >
              {loading ? "Processing..." : "Buy Now"}
            </Button>
          </div>
        </CardBody>
      </Card>
      <Modal
        className="bg-gradient-to-b from-default-100 shadow-lg"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                You need to be logged in!
              </ModalHeader>
              <ModalBody>
                <p>
                  Please log in to interact. Would you like to be redirected to
                  the login page?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Link href="/login">
                  <Button color="primary" onPress={onClose}>
                    Login
                  </Button>
                </Link>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SubscriptionCard;
