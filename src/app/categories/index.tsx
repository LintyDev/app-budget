import GoBack from "@/components/common/GoBack";
import { useAppSelector } from "@/hooks/redux.hooks";
import globalStyles from "@/styles/globalStyles";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { router } from "expo-router";
import { useEffect } from "react";
import ListCategories from "@/components/categories/ListCategories";
import CategoriesService from "@/services/categories.services";

function CategoriesPage() {
  const accounts = useAppSelector((state) => state.accounts);
  console.log(accounts[0].allocatedRemainingAmount);

  return (
    <SafeAreaView style={globalStyles.container}>
      <GoBack title="Catégories" link="/dashboard/"/>
      {accounts[0].countCategories === 0 ? 
        <View style={styles.containerAdd}>
          <View style={styles.addbutton}>
            <Pressable onPress={() => router.push('/categories/create/')}>
              <AntDesign name="pluscircle" size={48} color="white" />
            </Pressable>
            <Text style={globalStyles.text}>Ajouter une catégorie</Text>
          </View>
        </View> :
        <>
          <Text style={globalStyles.text}>composant menu cat</Text>
          <Pressable onPress={() => router.push('/categories/create/')}>
            <Text style={globalStyles.text}>add category</Text>
          </Pressable>
          <ListCategories />
        </>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerAdd:{
    marginTop: 15
  },
  addbutton: {
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default CategoriesPage;