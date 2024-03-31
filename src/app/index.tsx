import { router } from "expo-router";
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { createTables } from "@/lib/datasource";
import UserService from "@/services/user.services";
import globalStyles from "@/styles/globalStyles";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux.hooks";
import { userChecking } from "@/features/user/userSlice";

function LoadingIndexPage() {
  const debug = false;

  const dispatch = useAppDispatch();

  const checkUser = async () => {
    try {
      const act = await dispatch(userChecking());
      console.log(act.payload);
    } catch (err) {
      console.log(err);
    }
  }

  const initApp = async () => {
    // First create tables
    createTables();

    // check if an user exist
    try {
      const check = await dispatch(userChecking());
      if (check.payload) {
        router.replace("/dashboard/");
      } else {
        console.log('pas de data');
        router.replace("/login/");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!debug) {
      initApp();
    }
  }, []);

  if (debug) {
    return (
      <View style={styles.container}>
        <Text>loading page</Text>
        <Pressable onPress={() => router.replace("/dashboard/")}>
          <Text>Go to dashboard</Text>
        </Pressable>
        <Pressable onPress={() => router.replace("/login/")}>
          <Text>Go to login</Text>
        </Pressable>
        <Pressable onPress={checkUser}>
          <Text>Check if user exists</Text>
        </Pressable>
        <Pressable onPress={() => createTables()}>
          <Text>create tables</Text>
        </Pressable>
        <Text> -- List task --</Text>
        <Text>create tables</Text>
        <Text>check if a user exist</Text>
        <Text>- yes ? go dashboard</Text>
        <Text>- no ? go login</Text>
      </View>
    );
  } else {
    return (
      <SafeAreaView style={[globalStyles.container, styles.prodContainer]}>
        <Text style={globalStyles.text}>Chargement en cours ...</Text>
        <Image source={require('@assets/logo.png')} style={styles.prodImg} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 58,
    paddingHorizontal: 10,
  },
  prodContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  prodImg: {
    height: 100,
    width: 100
  }
})
export default LoadingIndexPage;