import { useAuth } from "@/shared/hooks/use-auth";
import { PageLoading } from "@/shared/ui/page-loader";
import { Redirect } from "expo-router";

export default function Index() {
  const demo = false;
  const { data, isLoading, isSuccess } = useAuth();
  if (demo) return <Redirect href={"/(tabs)/consumer/statistics"} />;

  if (isLoading) return <PageLoading />;

  if (!isSuccess && !data?.data && !isLoading) {
    return <Redirect href="/login/login" />;
  }

  const roleRoutes: Record<string, string> = {
    OrganizationAdmin: "/(tabs)/organization",
    Consumer: "/(tabs)/consumer",
    Employer: "/(tabs)/organization",
    owner: "/(tabs)/owner",
  };

  const userRole = data?.data?.role ?? "owner";
  const redirectTo: string = roleRoutes[userRole] ?? "/login/login";
  if (isSuccess && !isLoading) {
    return <Redirect href={redirectTo as any} />;
  }
}
