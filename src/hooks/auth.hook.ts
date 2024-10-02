import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import {
  getCurrentUserWithId,
  loginUser,
  registerUser,
  updateUserInfo,
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
export const useUserInfoUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_INFO_UPDATED"],
    mutationFn: async (userData) =>
      await updateUserInfo(userData._id, userData),
    onSuccess: () => {
      toast.success("Your data updated successfully.");

      // Invalidate and refetch the GET_USER_WITH_ID query to show updated data
      queryClient.invalidateQueries({ queryKey: ["GET_USER_WITH_ID"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
