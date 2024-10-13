// services/paymentService.ts
import { envConfig } from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/axiosInstence";
import axios from "axios";
import { config } from "process";

export const createCheckoutSession = async (price: number, email: string) => {
  const payload = {
    price,
    email,
  };
  try {
    const { data } = await axios.post(
      `${envConfig.baseApi}/stripe/create-checkout-session`,
      payload
    );
    // const { data } = await axiosInstance.post(
    //   "/stripe/create-checkout-session",
    //   payload
    // );
    // console.log();
    // console.log("price,", price, "userEmail:", email);
    console.log("data", data);
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.response?.data?.message || "Failed to create checkout session."
    );
  }
};
