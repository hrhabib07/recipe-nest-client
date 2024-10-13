// hooks/payment.hook.ts
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createCheckoutSession } from "../services/paymentServices";

export const useCreateCheckoutSession = () => {
  return useMutation({
    mutationFn: async ({ price, email }: { price: number; email: string }) => {
      return await createCheckoutSession(price, email);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success("Checkout session created successfully.");
    },
  });
};
