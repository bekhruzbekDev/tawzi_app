import { UserData } from "@/shared/types/helper.types";

export interface LoginDataRes {
  user: UserData;
  access_token: string;
  refresh_token: string;
}

