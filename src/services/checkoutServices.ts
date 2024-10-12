import { axiosInstance } from "@/src/lib/axiosInstence";

// Create a Stripe checkout session
export const createCheckoutSession = async (
  price: number,
  membershipType: string
): Promise<any> => {
  const { data } = await axiosInstance.post("/stripe/create-checkout-session", {
    price,
    membershipType,
  });
  return data;
};
