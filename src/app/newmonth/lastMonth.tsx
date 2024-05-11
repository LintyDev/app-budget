import globalStyles from "@/styles/globalStyles";
import { Keyboard, SafeAreaView, StyleSheet, TouchableWithoutFeedback, View, Text } from "react-native";

function lastMonthPage() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={globalStyles.containerCentered}>
        <View style={{ width: 250 }}>
          <Text style={[globalStyles.text, styles.title]}>Récap' du dernier mois 🗓️</Text>
          <Text style={[globalStyles.text, { textAlign: 'center', marginBottom: 20 }]}>Un peu de patiente, nous verifions vos catégories.</Text>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    textAlign: 'center',
  },
});

export default lastMonthPage;