import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import {
  changePasswordUser,
  forgetPassword,
  getCurrentUserWithId,
  loginUser,
  registerUser,
  resetPassword,
} from "../services/authServices";

export const useUserRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: () => {
      toast.success("User registration successful.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const usePasswordChange = () => {
  return useMutation<any, Error, FieldValues>({
    mutationFn: async (userData) => await changePasswordUser(userData),
    onSuccess: () => {
      toast.success("Password changed successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useForgetPassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationFn: async (userData) => await forgetPassword(userData),
    onSuccess: () => {
      toast.success("Reset URL email successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useResetPassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationFn: async (userData) => {
      await resetPassword(userData);
    },
    onSuccess: () => {
      toast.success("Reset URL email successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: () => {
      toast.success("User login successful.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUserData = () => {
  return useQuery({
    queryKey: ["GET_USER_WITH_ID"], // Use an object with 'queryKey' property
    queryFn: async () => {
      const data = await getCurrentUserWithId();

      return data;
    },
  });
};
