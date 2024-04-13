import globalStyles from "@/styles/globalStyles";
import { Log } from "@/types/logs";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

function ListActivities(props: {activities : Log}) {
  const { activities } = props;
  console.log(activities.id, activities);
  let icon : React.JSX.Element;
  switch (activities.type) {
    case 'add_account':
      icon = <MaterialCommunityIcons name="wallet-plus" size={35} color="#FFD5F8" />;
      break;
    case 'transaction_income':
      icon = <MaterialCommunityIcons name="cash-plus" size={35} color="#FFD5F8" />;
      break;
    case 'transaction_expense':
      icon = <MaterialCommunityIcons name="cash-minus" size={35} color="#FFD5F8" />;
      break;
    default:
      icon = <MaterialCommunityIcons name="information-outline" size={35} color="#FFD5F8" />;
      break;
  }
  console.log(activities.date);
  return (
    <View style={styles.container}>
      {icon}
      <Text style={globalStyles.text}>{activities.description}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default ListActivities;