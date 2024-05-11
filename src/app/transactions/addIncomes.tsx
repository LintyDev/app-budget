import GoBack from "@/components/common/GoBack";
import globalStyles from "@/styles/globalStyles";
import { Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks";
import { hexToRGB, numberDB } from "@/lib/common";
import { useState } from "react";
import { InputIncome } from "@/types/accounts";
import AccountsService from "@/services/accounts.services";
import ActivitiesServices from "@/services/activities.services";
import { getAccount, updateAccount } from "@/features/accounts/accountsSlice";
import { router } from "expo-router";

function addIncomes() {
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.accounts[0]);
  const date = new Date();
  const [income, setIncome] = useState<InputIncome>({
    description: '',
    monthYear: account.currentMonthYear,
    amount: 0,
    recursive: 0,
    accountId: 1,
    date: ''
  });
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const submitIncome = async () => {
    console.log(income);
    try {
      setIncome(prev => ({ ...prev, recursive: isEnabled ? 1 : 0 }));
      const updateIncome : InputIncome = {...income, recursive: isEnabled ? 1 : 0};
      const addIncome = await new AccountsService().addIncome(updateIncome);
      if (!addIncome) {
        console.log('erreur lors de lajout de l income');
        return;
      }

      const addIncomeLog = await new ActivitiesServices().addLog({
        type: 'transaction_income',
        description: `Revenu : ${income.description}`,
        date: date.toLocaleDateString(),
        amount: income.amount,
        transaction_type: isEnabled ? 'income_recursive' : 'income',
        remainingAmount: (account.currentAmount + income.amount),
        categoryId: null
      });
      if (!addIncomeLog) {
        console.log('erreur lors de lajout des logs');
        return;
      }

      await dispatch(updateAccount({ 
        id: 1,
        data: { 
          ...account, 
          currentAmount: (account.currentAmount + income.amount),
          initalAmount: isEnabled ? account.initalAmount + income.amount : account.initalAmount
        } 
      }));

      // reset account
      const addAccountState = await dispatch(getAccount());
      if (!addAccountState) {
        console.log('erreur reset account');
        return;
      }

      router.push('/dashboard/');
    } catch (error) {
      console.log('error add income', error);
    }
  }

  return (
    <SafeAreaView style={[globalStyles.container]}>
      <GoBack title="Ajouter un revenu" />
      <View style={[styles.containerInput]}>
        <View style={{ alignItems: 'flex-start' }}>
          <View style={[globalStyles.flexRow, styles.badge]}>
            <MaterialIcons name="account-balance" size={18} color="white" />
            <Text style={globalStyles.text}>{account.name}</Text>
          </View>
        </View>

        <TextInput
          style={globalStyles.input}
          placeholder="Description du revenu (e.g Revente TV leboncoin)"
          onChangeText={(text) => {
            setIncome(prev => ({ ...prev, description: text }));
          }}
        />

        <TextInput
          style={globalStyles.input}
          placeholder="Montant du revenu (e.g 200)"
          inputMode={"decimal"}
          keyboardType={"decimal-pad"}
          onChangeText={(text) => {
            setIncome(prev => ({ ...prev, amount: numberDB(text) }));
          }}
        />

        <View style={[globalStyles.flexRow, { gap: 5 }]}>
          <Switch
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Text style={[globalStyles.text]}>Tous les mois</Text>
        </View>

        <View style={{ alignItems: 'flex-end' }}>
          <Pressable
            onPress={submitIncome}
            style={globalStyles.greenButton}
          >
            <Text style={[globalStyles.text]}>Ajouter le revenu</Text>
          </Pressable>
        </View>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  containerInput: {
    gap: 15,
    marginTop: 15
  },
  badge: {
    gap: 5,
    padding: 10,
    backgroundColor: hexToRGB('#ffffff', 0.1),
    borderRadius: 10
  }
})

export default addIncomes;