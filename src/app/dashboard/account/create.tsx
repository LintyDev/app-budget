import GoBack from "@/components/common/GoBack";
import globalStyles from "@/styles/globalStyles";
import {
  Alert,
  Keyboard,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { InputAccount, InputIncome } from "@/types/accounts";
import AccountsService from "@/services/accounts.services";
import { router } from "expo-router";
import { useAppDispatch } from "@/hooks/redux.hooks";
import { getAccount } from "@/features/accounts/accountsSlice";
import ActivitiesServices from "@/services/activities.services";
import { numberDB } from "@/lib/common";

function CreateAccount() {
  const dispatch = useAppDispatch();
  const date = new Date();
  const fullDate = date.toLocaleDateString().split('/');
  const monthYear = fullDate[1] + '-' + fullDate[2];

  const [checkRecursive, setCheckRecursive] = useState(false);
  const [dataAccount, setDataAccount] = useState<InputAccount>({
    name: '',
    currentAmount: 0,
    initalAmount: 0,
    currentMonthYear: monthYear,
    countCategories: 0,
  });
  const [dataIncome, setDataIncome] = useState<InputIncome>({
    description: '',
    monthYear: monthYear,
    date: '',
    amount: 0,
    recursive: 0,
    accountId: 0
  });

  const submitAccount = async () => {
    if (dataAccount.name === '' || dataIncome.description === '' || dataIncome.amount === 0) {
      Alert.alert('Remplir tous les champs!','', [{ text: 'Ok' }]);
      return;
    }
    const check = checkRecursive ? 1 : 0;
    try {
      // create account
      const createAccount = await new AccountsService().createAccount(dataAccount);
      if (!createAccount) {
        return false;
      }

      // add income
      const inputAddIncome : InputIncome = { 
        ...dataIncome, 
        accountId: createAccount, 
        recursive: check };
      const addIncome = await new AccountsService().addIncome(inputAddIncome);
      if(!addIncome) {
        return false;
      }
      const addIncomeLog = await new ActivitiesServices().addLog({
        type: 'transaction_income',
        description: `Ajout du revenu : ${dataIncome.description}`,
        date: date.toLocaleDateString(),
        amount: inputAddIncome.amount,
        transaction_type: checkRecursive ? 'income_recursive' : 'income',
        remainingAmount: inputAddIncome.amount,
        categoryId: null
      });
      if (!addIncomeLog) {
        return false;
      }

      // update account
      const updateAccountData : InputAccount = {
        ...dataAccount,
        currentAmount: dataIncome.amount,
        initalAmount: dataIncome.amount,
      }
      const updateAccount = await new AccountsService().updateAccount(createAccount, updateAccountData);
      if(!updateAccount) {
        return false;
      }

      // update AccountGlobalState
      // const addAccountState = await dispatch(getAccountById(createAccount));
      const addAccountState = await dispatch(getAccount());
      if (!addAccountState) {
        return false;
      }

      // go to dashboard
      console.log('account created');
      router.push('/dashboard/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={globalStyles.container}>
        <GoBack title="Ajouter un compte" />
        <View style={styles.inputContainer}>
          <TextInput
            style={globalStyles.input}
            placeholder="Nom du compte (e.g Principal)"
            value={dataAccount.name}
            onChangeText={(text) => {
              setDataAccount(prev => ({...prev, name: text}));
            }}
          />
          <Text style={globalStyles.text}>Ajouter un revenu</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Description du revenu (e.g Salaire)"
            value={dataIncome.description}
            onChangeText={(text) => {
              setDataIncome(prev => ({...prev, description: text}));
            }}
          />
          <TextInput
            style={globalStyles.input}
            placeholder="Montant du revenu (e.g 2500)"
            inputMode={'numeric'}
            keyboardType={"number-pad"}
            onChangeText={(text) => {
              setDataIncome(prev => ({...prev, amount: numberDB(text)}));
            }}
          />
          <View style={styles.viewRow}>
            <Checkbox
              value={checkRecursive}
              onValueChange={setCheckRecursive}
              color={checkRecursive ? "#94C1B2" : undefined}
            />
            <Text style={globalStyles.text}>Tous les mois</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Pressable
              style={[globalStyles.greenButton]}
              onPress={submitAccount}
            >
              <Text style={[globalStyles.text]}>Créer le compte</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 25,
    marginTop: 15,
    gap: 15,
  },
  viewRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

export default CreateAccount;
