import globalStyles from "@/styles/globalStyles";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from "expo-router";

function ShortcutsCategories() {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.push('/categories/create/')}>
        <View style={styles.icon}>
          <View style={styles.bgIcon}>
            <MaterialCommunityIcons name="cash-minus" size={20} color="#FFD5F8" />
          </View>
          <Text style={globalStyles.text}>Dépenses</Text>
        </View>
      </Pressable>

      <Pressable onPress={() => router.push('/categories/create/')}>
        <View style={styles.icon}>
          <View style={styles.bgIcon}>
            <MaterialCommunityIcons name="wallet-plus" size={20} color="#FFD5F8" />
          </View>
          <Text style={globalStyles.text}>Catégories</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
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

export default ShortcutsCategories;