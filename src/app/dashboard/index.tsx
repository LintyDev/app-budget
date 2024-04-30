import Header from "@/components/common/Header";
import ShortcutsMenu from "@/components/dashboard/ShortcutsMenu";
import Accounts from "@/components/dashboard/Accounts";
import { RootState } from "@/store/store";
import globalStyles from "@/styles/globalStyles";
import { SafeAreaView, Text } from "react-native";
import { useSelector } from "react-redux";
import RecentActivities from "@/components/dashboard/RecentActivities";

function DashBoardHome() {
  const accounts = useSelector((state: RootState) => state.accounts);

  return (
    <SafeAreaView style={globalStyles.container}>
      <Header />
      <Accounts />
      {accounts[0].id && <ShortcutsMenu />}
      <RecentActivities />
    </SafeAreaView>
  );
}

export default DashBoardHome;