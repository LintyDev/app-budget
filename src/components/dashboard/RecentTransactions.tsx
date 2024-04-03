import globalStyles from "@/styles/globalStyles";
import { StyleSheet, Text, View } from "react-native";

function RecentTransactions() {
  return (
    <View>
      <Text style={[globalStyles.text, styles.title]}>Transactions récentes</Text>
      <Text style={[globalStyles.text]}>Aucune transaction</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28
  }
});

export default RecentTransactions;