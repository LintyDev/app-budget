import globalStyles from "@/styles/globalStyles";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  Pressable,
  Image,
} from "react-native";
import { useState } from "react";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import avatars from "@assets/avatars/avatars";
import UserService from "@/services/user.services";
import { InputUser } from "@/types/user";
import { useAppDispatch } from "@/hooks/redux.hooks";
import { createUser } from "@/features/user/userSlice";

function LoginPage() {
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [defaultAvatar, setDefaultAvatar] = useState(require("assets/avatars/avatar-2.png"));
  const { avatarId } = useLocalSearchParams();

  const dispatch = useAppDispatch();

  const submitStart = async () => {
    setError("");
    if ("" == name) {
      setError("Veuillez entrer votre prénom.");
    }
    let avatar = '2';
    if(avatarId) {
      avatar = avatarId as string;
    }
    const data: InputUser = {
      name,
      avatarId: avatar
    }

    // try {
    //   const createUser = await new UserService().createUser(data);
    //   if (createUser) {
    //     console.log('user saved');
    //     router.replace('/dashboard/');
    //   } else {
    //     console.log('une erreur est survenue');
    //   }
    // } catch (err) {
    //   console.error(err);
    // }

    try {
      const create = await dispatch(createUser(data));
      if (create) {
        console.log(create.payload);
        router.replace('/dashboard/');
      } else {
        console.log('une erreur est survenue (todo)');
      }
    } catch(err) {
      console.log(err);
    }
  };

  const goToChooseAvatar = () => {
    router.push("/login/chooseAvatar");
  }

  useFocusEffect(() => {
    if(avatarId){
      const choosenAvatar = avatars.find((e) => e.avatarId == +avatarId);
      setDefaultAvatar(choosenAvatar?.avatarPath);
    }
  });

  return (
    <SafeAreaView style={[globalStyles.container, styles.container]}>
      <View style={styles.loginForm}>
        <Text style={[globalStyles.text, styles.welcomeText]}>Bienvenue</Text>
        <Text style={[globalStyles.text, styles.chooseAvatar]}>
          Choisir un avatar
        </Text>
        <Pressable
          onPress={() => goToChooseAvatar()}
        >
          <Image
            style={styles.avatar}
            source={defaultAvatar}
          />
        </Pressable>
        <TextInput
          style={styles.input}
          placeholder="e.g Claire"
          value={name}
          onChangeText={setName}
        />
        {error ? <Text style={styles.textError}>{error}</Text> : ""}
        <Pressable style={styles.button} onPress={submitStart}>
          <Text style={[globalStyles.text, styles.textButton]}>Commencer</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  loginForm: {
    width: "50%",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    padding: 10,
    color: "white",
  },
  button: {
    borderColor: "white",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 10,
    backgroundColor: "#94C1B2",
  },
  textButton: {
    fontSize: 15,
  },
  textError: {
    color: "red",
  },
  avatar: {
    marginBottom: 15,
  },
  chooseAvatar: {
    fontSize: 12,
    fontStyle: "italic",
    marginBottom: 1,
    color: "#C2C2C2",
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 15,
  },
});

export default LoginPage;
