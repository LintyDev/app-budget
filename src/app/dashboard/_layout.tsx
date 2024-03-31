import { useAppSelector } from "@/hooks/redux.hooks";
import { RootState } from "@/store/store";
import { router, Slot } from "expo-router";
import { useEffect } from "react";

function DashboardLayout() {
  const user = useAppSelector((state : RootState) => state.user);
  useEffect(() => {
    if (user.name === null) {
      router.replace('/');
    }
  })

  return (
    <Slot />
  );
}

export default DashboardLayout;