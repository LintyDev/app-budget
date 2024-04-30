import globalStyles from "@/styles/globalStyles";
import { Log } from "@/types/logs";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

function ListActivities(props: {activities : Log}) {
  const { activities } = props;
  // for debug
  // console.log(activities.id, activities);

  const typeAmount = activities.transaction_type?.split('_');
  let icon : React.JSX.Element;
  let iconBg : string = '';
  switch (activities.type) {
    case 'add_account':
      icon = <MaterialCommunityIcons name="wallet-plus" size={30} color="#FFD5F8" />;
      break;
    case 'transaction_income':
      iconBg = '#94C1B2';
      icon = <MaterialCommunityIcons name="cash-plus" size={30} color="#FFD5F8" />;
      break;
    case 'transaction_expense':
      iconBg = '#C19494';
      icon = <MaterialCommunityIcons name="cash-minus" size={30} color="#FFD5F8" />;
      break;
    default:
      icon = <MaterialCommunityIcons name="information-outline" size={30} color="#FFD5F8" />;
      break;
  }
  return (
    <View style={styles.container}>
      <View style={[styles.iconBg, {backgroundColor: iconBg}]}>
        {icon}
      </View>

      <View>
        <Text style={[globalStyles.text, styles.description]}>{activities.description}</Text>
        <Text style={[globalStyles.text, styles.date]}>{activities.date}</Text>
      </View>

      <View style={styles.amount}>
        {activities.amount && 
        <Text style={[globalStyles.text, styles.textAmount, {color: iconBg}]}>{typeAmount && typeAmount[0] == 'income' ? '+' : '-'} {activities.amount}</Text>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    gap: 10
  },
  iconBg: {
    backgroundColor: "#94C1B2",
    padding: 5,
    borderRadius: 15,
  },
  description: {
    fontSize: 15,
    fontWeight: '500'
  },
  date: {
    color: 'grey',
    fontStyle: 'italic',
    fontSize: 12
  },
  amount: {
    flex: 1,
  },
  textAmount: {
    textAlign: 'right',
    fontSize: 20
  }
});

export default ListActivities;