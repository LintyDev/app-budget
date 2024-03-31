import globalStyles from "@/styles/globalStyles";
import avatars from "@assets/avatars/avatars";
import { router } from "expo-router";
import { FlatList, Image, Pressable, SafeAreaView} from "react-native";

function ChooseAvatarPage() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <FlatList
        data={avatars}
        renderItem={({ item }) => (
          <Pressable onPress={() => {
            router.navigate({
              pathname: "/login",
              params: {
                avatarId: item.avatarId
              }
            });
          }}>
            <Image source={item.avatarPath} />
          </Pressable>
        )}
        numColumns={3}
        contentContainerStyle={{ gap: 10 }}
      />
    </SafeAreaView>
  );
}


export default ChooseAvatarPage;