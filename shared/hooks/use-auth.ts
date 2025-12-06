import { getUser } from "@/services/queries";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useStore } from "../store/store";
import { GetUserRes } from "../types/helper.types";

export const useAuth = () => {
  const router = useRouter();
  const setUSerData = useStore((state) => state.setUserData);
  const { data, isLoading, isSuccess } = useQuery<GetUserRes>({
    queryKey: ["getUser"],
    queryFn: getUser,
  });

  useEffect(() => {
    if (!isLoading && isSuccess) {
      console.log({ test: data.data });

      setUSerData(data?.data);
    }
    if (!isLoading && !isSuccess) {
      setUSerData(null);
      AsyncStorage.removeItem("access_token");
      AsyncStorage.removeItem("refresh_token");
      // router.push("/login/login");
    }
  }, [data, isSuccess, isLoading]);
  return { isLoading, data, isSuccess };
};
