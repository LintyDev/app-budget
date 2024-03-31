import { RootState } from "@/store/store";
import globalStyles from "@/styles/globalStyles";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useSelector } from "react-redux";

function DashBoardHome() {
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    console.log('user : ',user);
  }, [])

  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.text}>Je suis le page dashboard {user.name}</Text>
    </SafeAreaView>
  );
}

export default DashBoardHome;