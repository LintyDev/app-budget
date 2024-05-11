import globalStyles from "@/styles/globalStyles";
import { router } from "expo-router";
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

function NewMonthPage() {
  return (
    <SafeAreaView style={[globalStyles.containerCentered]}>
      <View style={styles.view}>
        <Image source={require('@assets/logo.png')} style={styles.img} />
        <Text style={[globalStyles.text, {fontSize: 20}]}>C'est un nouveau mois ! YOUPIIIIIII 🥳</Text>
        <Text style={[globalStyles.text, {textAlign:'center', marginBottom: 20}]}>Il me faut juste quelques informations avant de retourner vers le dashboard.</Text>
        <Pressable
          style={globalStyles.greenButton}
          onPress={() => router.replace('/newmonth/resetAccount')}
        >
          <Text style={[globalStyles.text]}>Commencer</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    height: 150,
    width: 150,
    borderRadius: 20,
    marginBottom: 20
  },
  view: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    paddingHorizontal: 30
  }
});

export default NewMonthPage;