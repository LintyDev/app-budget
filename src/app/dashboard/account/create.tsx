import GoBack from "@/components/common/GoBack";
import globalStyles from "@/styles/globalStyles";
import {
  Keyboard,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Checkbox from "expo-checkbox";
import { useState } from "react";

function CreateAccount() {
  const [checkRecursive, setCheckRecursive] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={globalStyles.container}>
        <GoBack title="Ajouter un compte" />
        <View style={styles.inputContainer}>
          <TextInput
            style={globalStyles.input}
            placeholder="Nom du compte (e.g Principal)"
          />
          <Text style={globalStyles.text}>Ajouter un revenu</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Description du revenu (e.g Salaire)"
          />
          <TextInput
            style={globalStyles.input}
            placeholder="Montant du revenu (e.g 2500)"
            keyboardType={"number-pad"}
          />
          <View style={styles.viewRow}>
            <Checkbox
              value={checkRecursive}
              onValueChange={setCheckRecursive}
              color={checkRecursive ? "#94C1B2" : undefined}
            />
            <Text style={globalStyles.text}>Tous les mois</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Pressable
              style={[globalStyles.greenButton]}
              onPress={() => console.log("save data")}
            >
              <Text style={[globalStyles.text]}>Créer le compte</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 25,
    marginTop: 15,
    gap: 15,
  },
  viewRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

export default CreateAccount;
