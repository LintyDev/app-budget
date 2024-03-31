import globalStyles from "@/styles/globalStyles";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useAppSelector } from "@/hooks/redux.hooks";
import { useEffect } from "react";
import { router } from "expo-router";

// TODO
// Si pas de compte en bdd => icon plus pour add + message
// Afficher les comptes 
// Si goal dans comptes => Carroussel 1 . comptes / 2 . goals
// Comptes: initalAmount, currentAmount, monthYear => Click go to Dashboard/account?id=

function Accounts() {
  const accounts = useAppSelector((state) => state.accounts);
  useEffect(() => {
    console.log(accounts);
  }, []);

  if (accounts.length > 0) {
    return (
      <View style={styles.container}>
        <Text style={globalStyles.text}>je suis le composant comptes</Text>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.addbutton}>
          <Pressable onPress={() => router.navigate('/dashboard/account/create')}>
            <AntDesign name="pluscircle" size={48} color="white" />
          </Pressable>
          <Text style={globalStyles.text}>Ajouter un compte</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '20%',
    borderRadius: 15,
    padding: 15,
    marginTop: 10
  },
  addbutton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  }
});

export default Accounts;