// hooks/user.hook.ts
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/userServices";

export const useAllUsersData = (searchTerm = "") => {
  return useQuery({
    queryKey: ["GET_USER_WITH_ID", searchTerm], // Include `searchTerm` in the query key
    queryFn: async () => await getAllUsers(searchTerm), // Pass `searchTerm` to the API function
    enabled: true, // Keep enabled for refetching, it can be controlled with conditions if needed
  });
};
