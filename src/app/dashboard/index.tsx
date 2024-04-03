import Header from "@/components/common/Header";
import ShortcutsMenu from "@/components/dashboard/ShortcutsMenu";
import Accounts from "@/components/dashboard/Accounts";
import { RootState } from "@/store/store";
import globalStyles from "@/styles/globalStyles";
import { SafeAreaView, Text } from "react-native";
import { useSelector } from "react-redux";
import RecentTransactions from "@/components/dashboard/RecentTransactions";

function DashBoardHome() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <SafeAreaView style={globalStyles.container}>
      <Header />
      <Accounts />
      <ShortcutsMenu />
      <RecentTransactions />
    </SafeAreaView>
  );
}

export default DashBoardHome;