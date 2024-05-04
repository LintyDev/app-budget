import GoBack from "@/components/common/GoBack";
import { useAppSelector } from "@/hooks/redux.hooks";
import CategoriesService from "@/services/categories.services";
import globalStyles from "@/styles/globalStyles";
import { CategoryWithExpenses } from "@/types/categories";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { FontAwesome6 } from '@expo/vector-icons';
import ListExpenses from "@/components/transactions/ListExpenses";
import ExpensesService from "@/services/expenses.services";
import ModalEditCategory from "@/components/categories/ModalEditCategory";
import CategoryCard from "@/components/categories/CategoryCard";
import ModalEditExpenses from "@/components/transactions/ModalEditExpenses";
import { Expense } from "@/types/accounts";

function CategoryViewPage() {
  const { id } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<CategoryWithExpenses | null>(null);
  const account = useAppSelector((state) => state.accounts[0]);
  const [modalEdit, setModalEdit] = useState<boolean>(false);
  const [modalExpenseEdit, setModalExpenseEdit] = useState<boolean>(false);
  const [currentExpense, setCurrentExpense] = useState<Expense>({
    id: 0,
    description: '',
    amount: 0,
    monthYear: '',
    date: '',
    categoryId: 0,
    accountId: 0
  });

  useEffect(() => {
    const getCategory = async (id: number) => {
      try {
        const cat = await new CategoriesService().getCategory(id);
        const expenses = await new ExpensesService().getMonthlyExpensesByCatId(id, account.currentMonthYear);
        if (cat) {
          cat.expenses = expenses;
        }
        setData(cat);
      } catch (error) {
        router.push('/dashboard/');
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      getCategory(+id);
    }

  }, [id]);

  if (isLoading || data === null) {
    return (
      <SafeAreaView style={globalStyles.container}>
        <GoBack title={'Category'} />
        <Text style={globalStyles.text}> Chargement...</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={globalStyles.container} >
      <View>
        <GoBack title={data.name} />
        <Pressable style={styles.iconEdit} onPress={() => setModalEdit(!modalEdit)}>
          <FontAwesome6 name="edit" size={24} color="white" />
        </Pressable>
      </View>
      <CategoryCard data={data}/>
      <View style={[globalStyles.container, styles.containerExpenses]}>
        <Text style={[globalStyles.text, { fontSize: 28 }]}>Dépenses du mois :</Text>
        <ScrollView>
          {data.expenses?.map((e) => {
            return (
              <Pressable key={e.id} onPress={() => {
                setCurrentExpense(e);
                setModalExpenseEdit(!modalExpenseEdit);
              }}>
                <ListExpenses expenses={e} />
              </Pressable>
            )
          })}
        </ScrollView>
      </View>
      <ModalEditCategory category={data} setCategory={setData} open={modalEdit} close={setModalEdit}/>
      <ModalEditExpenses open={modalExpenseEdit} close={setModalExpenseEdit} expense={currentExpense} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  containerExpenses: {
    marginTop: 10
  },
  iconEdit: {
    position: 'absolute',
    right: 5,
    top: 4
  },
});

export default CategoryViewPage;