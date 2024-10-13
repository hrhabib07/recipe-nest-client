import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { toast } from "sonner";
import { loadStripe } from "@stripe/stripe-js";
import { createCheckoutSession } from "../services/paymentServices";

interface CheckoutPayload {
  price: number;
  membershipType: string;
}

export const useCheckout = (): UseMutationResult<
  any,
  Error,
  CheckoutPayload
> => {
  return useMutation({
    mutationKey: ["checkoutSession"],
    mutationFn: async (payload: CheckoutPayload) =>
      await createCheckoutSession(payload.price, payload.membershipType),
    onSuccess: (data) => {
      // Redirect to Stripe Checkout with the session ID
      const stripe = loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
      );

      stripe.then((stripeInstance) => {
        stripeInstance?.redirectToCheckout({ sessionId: data.id });
      });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Checkout failed");
    },
  });
};
