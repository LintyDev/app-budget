import { useAppSelector } from "@/hooks/redux.hooks";
import { RootState } from "@/store/store";
import globalStyles from "@/styles/globalStyles";
import avatars from "@assets/avatars/avatars";
import { Image, StyleSheet, Text, View } from "react-native";

function Header() {
  const user = useAppSelector((state : RootState) => state.user);
  const avatar = avatars.find((a) => a.avatarId === (user.avatarId ? +user.avatarId : 1));

  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar} 
        source={avatar?.avatarPath}
      />
      <Text style={[globalStyles.text, styles.text]}>
        <Text>Hello, </Text>
        <Text style={styles.name}>{user.name}!</Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
  },
  avatar: {
    height: 48,
    width: 48
  },
  text: {
    fontSize: 38
  },
  name: {
    fontWeight: 'bold'
  }
})

export default Header;