import globalStyles from "@/styles/globalStyles";
import { Expense } from "@/types/accounts";
import { StyleSheet, Text, View } from "react-native";

function ListExpenses({ expenses }: { expenses: Expense }) {
  console.log(expenses);

  return (
    <View style={styles.container}>
      <View>
        <Text style={[globalStyles.text, styles.textDesc]}>{expenses.description}</Text>
        <Text style={[globalStyles.text, styles.textDate]}>{expenses.date}</Text>
      </View>
      <Text style={[globalStyles.text, styles.textAmount]}>- {expenses.amount}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  textDesc: {
    fontSize: 20
  },
  textDate:{
    fontStyle: 'italic',
    color: 'grey'
  },
  textAmount: {
    fontSize: 20,
    color: '#C19494'
  }
});

export default ListExpenses;