import Header from "@/components/common/Header";
import Accounts from "@/components/dashboard/Accounts";
import { RootState } from "@/store/store";
import globalStyles from "@/styles/globalStyles";
import { SafeAreaView, Text } from "react-native";
import { useSelector } from "react-redux";

function DashBoardHome() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <SafeAreaView style={globalStyles.container}>
      <Header />
      <Accounts />
      <Text style={globalStyles.text}>Je suis le page dashboard {user.name}</Text>
    </SafeAreaView>
  );
}

export default DashBoardHome;