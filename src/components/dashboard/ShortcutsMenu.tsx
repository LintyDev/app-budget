import globalStyles from "@/styles/globalStyles";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

function ShortcutsMenu() {
  return (
    <View style={styles.container}>

      <View style={styles.icon}>
        <View style={styles.bgIcon}>
          <MaterialCommunityIcons name="cash-minus" size={30} color="white" />
        </View>
        <Text style={globalStyles.text}>Dépenses</Text>
      </View>

      <View style={styles.icon}>
        <View style={styles.bgIcon}>
          <MaterialCommunityIcons name="cash-plus" size={30} color="white" />
        </View>
        <Text style={globalStyles.text}>Revenus</Text>
      </View>

      <View style={styles.icon}>
        <View style={styles.bgIcon}>
          <MaterialCommunityIcons name="chart-bar"size={30} color="white" />
        </View>
        <Text style={globalStyles.text}>Statistiques</Text>
      </View>

      <View style={styles.icon}>
        <View style={styles.bgIcon}>
          <MaterialCommunityIcons name="bullseye-arrow" size={30} color="white" />
        </View>
        <Text style={globalStyles.text}>Objectifs</Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5
  },
  icon: {
    padding: 5,
    alignItems: 'center'
  },
  bgIcon: {
    backgroundColor: '#222',
    borderRadius: 25,
    padding: 15,
    marginBottom: 5
  }
});

export default ShortcutsMenu;