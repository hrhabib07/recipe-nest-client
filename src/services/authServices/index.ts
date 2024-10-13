"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

import { axiosInstance } from "@/src/lib/axiosInstence";

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/register", userData);

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const logout = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    return {
      _id: decodedToken._id,
      name: decodedToken.name,
      email: decodedToken.email,
      mobileNumber: decodedToken.mobileNumber,
      role: decodedToken.role,
      status: decodedToken.status,
      profilePhoto: decodedToken.profilePhoto,
    };
  }

  return decodedToken;
};
export const changePasswordUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      `/auth/change-password`,
      userData,
    );

    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to change password.",
    );
  }
};
export const forgetPassword = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      `/auth/forget-password`,
      userData,
    );

    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to send the email.",
    );
  }
};
export const resetPassword = async (userData: FieldValues) => {
  const accessToken = userData.accessToken;

  cookies().set("accessToken", accessToken);
  const payload = {
    email: userData.email,
    newPassword: userData.newPassword,
  };

  // console.log("final payload", payload);
  try {
    const { data } = await axiosInstance.post(`/auth/reset-password`, payload);

    cookies().delete("accessToken");

    // console.log(data);
    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to reset the password.",
    );
  }
};
export const getCurrentUserWithId = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
    try {
      const { data } = await axiosInstance.get(`/users/${decodedToken._id}`);

      return data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch user data.",
      );
    }
  }

  throw new Error("No access token found.");
};

export const getNewAccessToken = async () => {
  try {
    const refreshToken = cookies().get("refreshToken")?.value;

    const res = await axiosInstance({
      url: "/auth/refresh-token",
      method: "POST",
      withCredentials: true,
      headers: {
        cookie: `refreshToken=${refreshToken}`,
      },
    });

    return res.data;
  } catch (error) {
    throw new Error("Failed to get new access token");
  }
};
