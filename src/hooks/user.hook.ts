// hooks/user.hook.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";

import {
  getAllAdmins,
  getAllUsers,
  getSingleUsersProfileData,
  unfollowUser,
  updateUserInfo,
} from "../services/userServices";

export const useAllUsersData = (searchTerm = "") => {
  return useQuery({
    queryKey: ["GET_USER_WITH_ID", searchTerm], // Include `searchTerm` in the query key
    queryFn: async () => await getAllUsers(searchTerm), // Pass `searchTerm` to the API function
    enabled: true, // Keep enabled for refetching, it can be controlled with conditions if needed
  });
};
export const useAllAdminsData = (searchTerm = "") => {
  return useQuery({
    queryKey: ["GET_USER_WITH_ID", searchTerm], // Include `searchTerm` in the query key
    queryFn: async () => await getAllAdmins(searchTerm), // Pass `searchTerm` to the API function
    enabled: true, // Keep enabled for refetching, it can be controlled with conditions if needed
  });
};
export const useGetSingleUsersProfileData = (userId: string) => {
  return useQuery({
    queryKey: ["GET_USER_WITH_ID"], // Include `searchTerm` in the query key
    queryFn: async () => await getSingleUsersProfileData(userId),
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
export const useUnfollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_INFO_UPDATED"],
    mutationFn: async (userData) => await unfollowUser(userData._id, userData),
    onSuccess: () => {
      toast.success("user has been unfollowd successfully.");

      // Invalidate and refetch the GET_USER_WITH_ID query to show updated data
      queryClient.invalidateQueries({ queryKey: ["GET_USER_WITH_ID"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
