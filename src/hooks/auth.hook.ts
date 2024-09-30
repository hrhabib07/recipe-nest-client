import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../services/authServices";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { error } from "console";

export const useUserRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["user-registration"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: () => {
      toast.success("user register successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
