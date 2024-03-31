import { Stack } from "expo-router";

function LoginLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{
        headerShown: false,
      }}/>
      <Stack.Screen name="chooseAvatar" options={{
        headerTitle: "Choisir un Avatar",
        headerStyle:{
          backgroundColor: "black",
        },
        headerTintColor: "white",
        headerBackTitle: "Retour"
      }}/>
    </Stack>
  );
}

export default LoginLayout;