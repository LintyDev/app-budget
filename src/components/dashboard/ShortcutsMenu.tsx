import globalStyles from "@/styles/globalStyles";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from "expo-router";
import { useAppSelector } from "@/hooks/redux.hooks";

function ShortcutsMenu() {
  const accounts = useAppSelector((state) => state.accounts);
  return (
    <View style={styles.container}>
      {accounts[0] && 
        <Pressable onPress={() => {
          if (accounts[0].countCategories > 0) {
            router.push('/transactions/addExpenses')
          } else {
            Alert.alert('Il faut d\'abord ajouter une catégorie','', [{ text: 'Ok' }]);
          }
        }}>
          <View style={styles.icon}>
            <View style={styles.bgIcon}>
              <MaterialCommunityIcons name="cash-minus" size={20} color="#FFD5F8" />
            </View>
            <Text style={globalStyles.text}>Dépenses</Text>
          </View>
        </Pressable>
      }
      
      <Pressable onPress={() => router.push('/transactions/addIncomes')}>
        <View style={styles.icon}>
          <View style={styles.bgIcon}>
            <MaterialCommunityIcons name="cash-plus" size={20} color="#FFD5F8" />
          </View>
          <Text style={globalStyles.text}>Revenus</Text>
        </View>
      </Pressable>

      <Pressable  onPress={() => router.push('/categories/create/')}>
        <View style={styles.icon}>
          <View style={styles.bgIcon}>
            <MaterialCommunityIcons name="wallet-plus" size={20} color="#FFD5F8" />
          </View>
          <Text style={globalStyles.text}>Catégories</Text>
        </View>
      </Pressable>

      <Pressable 
        onPress={() => {
            Alert.alert('Coming soon','', [{ text: 'Ok' }]);
        }}
      >
        <View style={styles.icon}>
          <View style={styles.bgIcon}>
            <MaterialCommunityIcons name="chart-bar" size={20} color="#FFD5F8" />
          </View>
          <Text style={globalStyles.text}>Statistiques</Text>
        </View>
      </Pressable>

      <Pressable
        onPress={() => {
          Alert.alert('Coming soon','', [{ text: 'Ok' }]);
        }}
      >
        <View style={styles.icon}>
          <View style={styles.bgIcon}>
            <MaterialCommunityIcons name="bullseye-arrow" size={20} color="#FFD5F8" />
          </View>
          <Text style={globalStyles.text}>Objectifs</Text>
        </View>
      </Pressable>
    </View>
  );
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
    backgroundColor: '#151515',
    borderRadius: 20,
    padding: 15,
    marginBottom: 5
  }
});

export default ShortcutsMenu;