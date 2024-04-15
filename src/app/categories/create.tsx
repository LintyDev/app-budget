import GoBack from "@/components/common/GoBack";
import globalStyles from "@/styles/globalStyles";
import { Keyboard, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import ColorPicker, { HueCircular, HueSlider, Panel1, Preview } from "reanimated-color-picker";

function CategoryCreatePage() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={[globalStyles.container, styles.container]}>
        <GoBack title="Ajouter une catégorie" link="/categories/" />

        <View style={styles.colorPicker}>
          <Text style={[globalStyles.text, styles.textCP]}>
            Choisir une couleur pour la catégorie
          </Text>
          <ColorPicker style={{ gap: 10 }}>
            <HueSlider />
            <Panel1 style={{ height: 150 }} />
            <Preview hideInitialColor={true} hideText={true} />
          </ColorPicker>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={globalStyles.input}
            placeholder="Nom de la catégorie (e.g Courses)"
          />
          <TextInput
            style={globalStyles.input}
            inputMode={"decimal"}
            keyboardType={"number-pad"}
            placeholder="Montant alloué (e.g 500)"
          />

          // TODO ADD BUTTON AND 2 LOGICS JUST CREATE AND CREATE WITH TRANSACTION !
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10
  },
  colorPicker: {
    paddingHorizontal: 100,
    marginBottom: 20
  },
  textCP: {
    textAlign: 'center',
    marginVertical: 10
  },
  inputContainer: {
    gap: 15
  }
});

export default CategoryCreatePage;