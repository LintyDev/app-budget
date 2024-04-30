import { Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import globalStyles from "@/styles/globalStyles";
import { router } from "expo-router";

function GoBack(props: {title: string, link?: string}) {

  const back = () => {
    router.back();
  }

  const pushBack = (link: string) => {
    router.push(link);
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => {
        if (props.link) {
          pushBack(props.link);
        } else {
          back();
        }
      }}>
        <View style={styles.goBack}>
          <AntDesign name="left" size={30} color="white" />
          <Text style={[globalStyles.text, styles.text]}>Retour</Text>
        </View>
      </Pressable>
      <View style={styles.titleContainer}>
        <Text style={[globalStyles.text, styles.textTitle]}>{props.title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  goBack: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    width: '100%'
  },
  text: {
    fontSize: 20
  },
  textTitle: {
    fontSize: 20
  },
  titleContainer: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1
  }
});

export default GoBack;
