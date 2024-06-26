import GoBack from "@/components/common/GoBack";
import CategoriesService from "@/services/categories.services";
import globalStyles from "@/styles/globalStyles";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { Alert, Keyboard, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks";
import { hexToRGB, numberDB } from "@/lib/common";
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { InputExpense } from "@/types/accounts";
import AccountsService from "@/services/accounts.services";
import { updateAccount } from "@/features/accounts/accountsSlice";
import ExpensesService from "@/services/expenses.services";

function addExpenses() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => await new CategoriesService().getCategories(),
  });
  const dispatch = useAppDispatch();
  const accounts = useAppSelector((state) => state.accounts);
  const [picker, setPicker] = useState<number>(data ? data[0].id : 1);
  const [dataExpense, setDataExpense] = useState<InputExpense>({
    description: '',
    amount: 0,
    monthYear: accounts[0].currentMonthYear,
    date: '',
    categoryId: data ? data[0].id : 1,
    accountId: accounts[0].id
  });
  
  useEffect(() => {
    if (data) {
      setDataExpense(prev => ({...prev, categoryId: data[0].id}));
      setPicker(data[0].id);
    }
  }, [data]);

  if (isLoading) {
    return (
      <View>
        <Text style={globalStyles.text}>Loading...</Text>
      </View>
    )
  }

  if (isError) {
    return router.push('/dashboard/');
  }

  const submitExpense = async () => {
    if (dataExpense.description === '' || dataExpense.amount === 0) {
      Alert.alert('Remplir tous les champs','', [{ text: 'Ok' }]);
      return;
    }
    const currentData = data && data.find((c) => c.id === picker);
    if (currentData && currentData.currentAmount < dataExpense.amount) {
      Alert.alert('Le montant est trop grand pour cette catégorie','', [{ text: 'Ok' }]);
      return;
    }
    if (data && data.find((c) => c.id === picker)?.currentAmount === 0) {
      Alert.alert('Plus d\'argent disponible dans cette catégorie','', [{ text: 'Ok' }]);
      return;
    }

    try {
      const remainAccLogs = accounts[0].currentAmount - dataExpense.amount;
      const currAmountCat = data?.find((c) => c.id === dataExpense.categoryId);
      const newAmountCat = currAmountCat && currAmountCat?.currentAmount - dataExpense.amount;
      const addExpense = await new ExpensesService().addExpense(dataExpense, remainAccLogs, newAmountCat ?? 0);
      await dispatch(updateAccount({
        id: 1, 
        data: {...accounts[0], currentAmount: (accounts[0].currentAmount - dataExpense.amount)}
      }));
      if(addExpense) {
        router.push('/categories/');
      }
    } catch (error) {
      console.log('error add expense', error);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={globalStyles.container}>
        <GoBack title="Ajouter une dépense" />
        <View style={styles.containerInput}>
          <View style={{ alignItems: 'flex-start' }}>
            <View style={[globalStyles.flexRow, styles.badge]}>
              <MaterialIcons name="account-balance" size={18} color="white" />
              <Text style={globalStyles.text}>{accounts[0].name}</Text>
            </View>
          </View>

          <TextInput
            style={globalStyles.input}
            placeholder="Description de la dépense (e.g Super U)"
            onChangeText={(text) => {
              setDataExpense(prev => ({...prev, description: text}))
            }}
          />
          <View>
            <View style={{ alignItems: 'flex-start' }}>
              <View style={styles.miniBadge}>
                <Text style={[globalStyles.text, styles.miniBadgeText]}>max : {data && data.find((c) => c.id === picker)?.currentAmount.toFixed(2)} €</Text>
              </View>
            </View>
            <TextInput
              style={globalStyles.input}
              placeholder="Montant de la dépense (e.g 24,90)"
              inputMode={"decimal"}
              keyboardType={"decimal-pad"}
              onChangeText={(text) => {
                setDataExpense(prev => ({...prev, amount: numberDB(text)}));
              }}
            />
          </View>

          <Picker
          selectedValue={picker.toString()}
          onValueChange={(itemValue : string, itemIndex) => {
            setPicker(+itemValue);
            setDataExpense(prev => ({...prev, categoryId: +itemValue}));
          }}
            style={{ height: 200 }}
            itemStyle={{ height: 200 }}
          >
            {data && data.map((c) => {
              return (
                <Picker.Item label={c.name} value={c.id} key={c.id} color="white" />
              )
            })}
          </Picker>

          <View style={{ alignItems: 'flex-end' }}>
            <Pressable
              onPress={submitExpense}
              style={globalStyles.greenButton}
              >
              <Text style={[globalStyles.text]}>Ajouter la dépense</Text>
            </Pressable>
          </View>  
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  containerInput: {
    gap: 15,
    marginTop: 10
  },
  badge: {
    gap: 5,
    padding: 10,
    backgroundColor: hexToRGB('#ffffff', 0.1),
    borderRadius: 10
  },
  miniBadge: {
    padding: 5,
    backgroundColor: hexToRGB('#ffffff', 0.1),
    borderRadius: 5,
    marginBottom: 5
  },
  miniBadgeText: {
    fontSize: 12,
    fontStyle: 'italic'
  }
});

export default addExpenses;