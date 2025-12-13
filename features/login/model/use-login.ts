import { useStore } from "@/shared/store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { LoginFormData } from "../ui/auth-form";
import { loginMutation } from "./mutations";
import { LoginDataRes } from "./types";

const roleRoutes: Record<any, any> = {
  OrganizationAdmin: "/(tabs)/organization",
  Consumer: "/(tabs)/consumer",
  Employer: "/(tabs)/organization",
  owner: "/(tabs)/owner",
};
export const useLogin = () => {
  const router = useRouter();
  const setUser = useStore((state) => state.setUserData);
  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginFormData) => loginMutation(data),
    mutationKey: ["login-mutation"],
    onSuccess: (data: LoginDataRes) => {
      AsyncStorage.setItem("access_token", data.access_token);
      AsyncStorage.setItem("refresh_token", data.refresh_token);
      setUser(data?.user);

      router.push(roleRoutes[data?.user?.role ?? "owner"] ?? "/");
    },
    onError: (err: any) => {
      console.log({ err });

      Toast.show({
        type: "error",
        text1: err?.data?.message,
      });
    },
  });

  const submitData = (data: LoginFormData) => {
    mutate(data);
  };
  return { submitData, loading: isPending };
};
