import { useAppSelector } from "@/hooks/redux.hooks";
import globalStyles from "@/styles/globalStyles";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import { hexToRGB } from "@/lib/common";

function HeaderCategories() {
  const account = useAppSelector((state) => state.accounts);
  return (
    <View style={[globalStyles.flexRow, styles.container]}>
      <View style={[globalStyles.flexRow, styles.badge]}>
        <MaterialIcons name="account-balance" size={18} color="white" />
        <Text style={[globalStyles.text, styles.textRecap]}>{account[0].name}</Text>
      </View>

      <View style={[globalStyles.flexRow, styles.badge]}>
        <FontAwesome5 name="euro-sign" size={16} color="white" />
        <Text style={[globalStyles.text, styles.textRecap]}>{parseFloat(account[0].currentAmount.toFixed(2))}</Text>
      </View>

      <View style={[globalStyles.flexRow, styles.badge]}>
        <FontAwesome6 name="money-bill-transfer" size={18} color="white" />
        <Text style={[globalStyles.text, styles.textRecap]}>€ {account[0].allocatedRemainingAmount}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    justifyContent: 'center',
    marginTop: 15
  },
  badge: {
    gap: 5,
    padding: 5,
    backgroundColor: hexToRGB('#ffffff', 0.1),
    borderRadius: 10
  },
  textRecap: {
    fontSize: 16
  }
});

export default HeaderCategories;