import { updateAccount } from "@/features/accounts/accountsSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks";
import { currentMonthYear, hexToRGB, numberDB } from "@/lib/common";
import AccountsService from "@/services/accounts.services";
import ActivitiesServices from "@/services/activities.services";
import globalStyles from "@/styles/globalStyles";
import Account, { Income } from "@/types/accounts";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, Pressable } from "react-native";

function ResetAccountPage() {
  const account = useAppSelector((state) => state.accounts[0]);
  const { data, isError, isLoading } = useQuery({
    queryKey: ['income'],
    queryFn: async () => await new AccountsService().getIncomesRecursive()
  });
  const dispatch = useAppDispatch();
  const monthYear = currentMonthYear();
  // const monthYear = '06-2024'
  const [income, setIncome] = useState<Income>({
    id: 1,
    description: '',
    amount: 0,
    monthYear: '',
    date: '',
    recursive: 1,
    accountId: 1
  });
  const [newInitialAmount, setNewInitialAmount] = useState<number>(0)
  const [curr, setCurr] = useState<number>(0);
  

  const nextIncome = async () => {
    const incomes = data && [...data];
    if (incomes && incomes.length > 1 && curr < incomes.length - 1) {
      setIncome(incomes[curr + 1]);
      setCurr(curr + 1);
      setNewInitialAmount(newInitialAmount + income.amount);
      return;
    } else {
      const amount = newInitialAmount + income.amount;
      try {
        const updatedAccount : Account = {...account, currentMonthYear: monthYear, initalAmount: amount, currentAmount: amount};
        await dispatch(updateAccount({id: 1, data: updatedAccount}));

        await new ActivitiesServices().addLog({
          type: 'new_month',
          description: 'Nouveau mois ! 🥳',
          date: monthYear,
          amount: account.initalAmount,
          transaction_type: 'income_new_month',
          remainingAmount: null,
          categoryId: null,
        });

        router.replace('/newmonth/resetCategories');
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    if (data) {
      setIncome(data[0]);
    }
  }, [data]);

  if (isLoading) {
    return (
      <SafeAreaView style={globalStyles.containerCentered}>
        <View>
          <Text style={globalStyles.text}>Chargement en cours</Text>
        </View>
      </SafeAreaView>
    )
  }

  if (isError || !data) {
    return router.replace('/');
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={globalStyles.containerCentered}>
        <View style={{ width: 250 }}>
          <Text style={[globalStyles.text, styles.title]}>Revenus 🏦</Text>
          <Text style={[globalStyles.text, { textAlign: 'center', marginBottom: 20 }]}>Nous allons revoir tous tes revenus récurrent pour confirmer les montants.</Text>
          <View style={styles.badge}>
            <Text style={[globalStyles.text, styles.badgeText]}>{income.description}</Text>
          </View>
          <TextInput
            style={globalStyles.input}
            placeholder="Montant du revenus"
            inputMode={"decimal"}
            keyboardType={"decimal-pad"}
            value={`${income.amount}`}
            onChangeText={(text) => {
              setIncome(prev => ({...prev, amount: numberDB(text)}));
            }}
          />
          <View style={{ alignItems: 'flex-end', marginTop: 20 }}>
            <Pressable
              style={[globalStyles.greenButton]}
              onPress={nextIncome}
            >
              <Text style={globalStyles.text}>Suivant</Text>
            </Pressable>
          </View>
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
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: hexToRGB('#ffffff', 0.1),
    borderRadius: 5,
    marginBottom: 10
  },

  badgeText: {
    fontSize: 15,
    textAlign: 'center'
  }
});

export default ResetAccountPage;