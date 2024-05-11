import { getAccount } from "@/features/accounts/accountsSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks";
import CategoriesService from "@/services/categories.services";
import globalStyles from "@/styles/globalStyles";
import Category from "@/types/categories";
import { router } from "expo-router";
import { useEffect } from "react";
import { Keyboard, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

function ResetCategoriesPage() {
  const dispatch = useAppDispatch();

  const getAllCategories = async () => {
    try {
      const getCat = await new CategoriesService().getCategories();
      if (!getCat) {
        router.replace('/dashboard/');
        return;
      }
      // TODO check if countAllocated is greater than account initalamount
      getCat.forEach(async (c) => {
        const resetCategory : Category = {...c, currentAmount: c.amountAllocated};
        await new CategoriesService().updateCategoryForExpense(resetCategory);
      });

      await dispatch(getAccount());

      router.replace('/dashboard/');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllCategories();
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={globalStyles.containerCentered}>
        <View style={{ width: 250 }}>
          <Text style={[globalStyles.text, styles.title]}>Catégories 📦</Text>
          <Text style={[globalStyles.text, { textAlign: 'center', marginBottom: 20 }]}>Un peu de patiente, nous verifions vos catégories.</Text>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    textAlign: 'center',
  },
});

export default ResetCategoriesPage;