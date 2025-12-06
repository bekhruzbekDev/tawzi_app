export interface UserData {
  first_name: string;
  last_name?: string;
  username: string;
  role: UserType;
  organization?: Organization;
  permissions?: Permissions;
}
export type UserType = "OrganizationAdmin" | "Consumer" | "Employer" | null;

export interface Organization {
  id: number;
  has_billing: boolean;
  device_types: string[];
  has_solar_panel: boolean;
  has_generator: boolean;
}

export interface Permissions {
  add_device_permission: boolean;
  add_consumer_permission: boolean;
  add_user_permission: boolean;
  valve_control_permission: boolean;
}

export type IconType =
  | "AntDesign"
  | "Entypo"
  | "EvilIcons"
  | "Feather"
  | "FontAwesome"
  | "FontAwesome5"
  | "Foundation"
  | "Ionicons"
  | "MaterialIcons"
  | "MaterialCommunityIcons"
  | "Octicons"
  | "SimpleLineIcons"
  | "Zocial";

export interface RoutesData {
  id: string;
  title: string;
  icon: string;
  path: string;
  iconType: IconType;
  role: string[];
}

export interface GetUserRes {
  data: UserData;
  success: boolean;
}
