import globalStyles from "@/styles/globalStyles";
import { Dimensions, Keyboard, Modal, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import Account, { Expense } from "@/types/accounts";
import { useEffect, useState } from "react";
import { numberDB } from "@/lib/common";
import Category from "@/types/categories";
import ExpensesService from "@/services/expenses.services";
import CategoriesService from "@/services/categories.services";
import { router } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks";
import { updateAccount } from "@/features/accounts/accountsSlice";

function ModalEditExpenses(props: { expense: Expense, open: boolean, close: React.Dispatch<React.SetStateAction<boolean>>, category: Category }) {
  const windowHeight = Dimensions.get('window').height;
  const heightModal = (65 * windowHeight) / 100;
  const account = useAppSelector((state) => state.accounts[0]);
  const dispatch = useAppDispatch();
  const { expense, open, close, category } = props;
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [data, setData] = useState<Expense>({
    id: expense.id,
    description: expense.description,
    monthYear: expense.monthYear,
    date: expense.date,
    amount: expense.amount,
    categoryId: expense.categoryId,
    accountId: expense.accountId
  });
  
  useEffect(() => {
    setData({...expense})
  }, [expense])
  
  const submitUpdateExpense = async () => {
    const amountWithoutExpense = category.currentAmount + expense.amount;
    const accountAmountWithoutExpense = account.currentAmount + expense.amount;
    if (data.amount > amountWithoutExpense) {
      console.log('tu ne peux pas mettre ce prix');
    }
    try {
      const updateExpense = await new ExpensesService().updateExpense(data);
      if (!updateExpense) {
        console.log('unable to update database');
        return;
      }

      const updatedCategory : Category = {...category, currentAmount: amountWithoutExpense - data.amount};
      const updateCategory = await new CategoriesService().updateCategory(updatedCategory);
      if (!updateCategory) {
        console.log('unable to updated database');
        return;
      }
      const updatedAccount : Account = {...account, currentAmount: accountAmountWithoutExpense - data.amount};
      await dispatch(updateAccount({id: 1, data: updatedAccount}));

      router.replace(`/categories/${category.id}/`);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteExpense = async () => {
    const accountAmountWithoutExpense = account.currentAmount + expense.amount;
    const amountWithoutExpense = category.currentAmount + expense.amount;
    try {
      const deleteExpense = await new ExpensesService().deleteExpenseById(data.id, data.amount, data.description);
      if (!deleteExpense) {
        return;
      }

      const updatedCategory : Category = {...category, currentAmount: amountWithoutExpense};
      const updateCategory = await new CategoriesService().updateCategoryForExpense(updatedCategory);
      if (!updateCategory) {
        console.log('unable to updated database');
        return;
      }

      const updatedAccount : Account = {...account, currentAmount: accountAmountWithoutExpense};
      await dispatch(updateAccount({id: 1, data: updatedAccount}));

      router.replace(`/categories/${category.id}/`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        onRequestClose={() => {
          close(!open);
        }}
      >
        <View style={styles.modalEdit}>
          <View style={[styles.modalEditView, { height: heightModal }]}>
            <View style={styles.closeModal}>
              <Text style={globalStyles.text}>Modifier une dépense</Text>
              <Pressable onPress={() => close(!open)} style={[globalStyles.flexRow, { gap: 5 }]}>
                <Text style={globalStyles.text}>Fermer</Text>
                <AntDesign name="closecircleo" size={18} color="white" />
              </Pressable>
            </View>
            <View style={styles.inputField}>
              <TextInput
                style={globalStyles.input}
                placeholder="Description de la dépense (e.g Super U)"
                value={data.description}
                onChangeText={(text) => {
                  setData(prev => ({...prev, description: text}));
                }}
              />
              <TextInput
                style={globalStyles.input}
                placeholder="Montant de la dépense (e.g 24,90)"
                inputMode={"decimal"}
                keyboardType={"decimal-pad"}
                value={`${data.amount}`}
                onChangeText={(text) => {
                  setData(prev => ({...prev, amount: numberDB(text)}));
                }}
              />
              <View style={[globalStyles.flexRow, { justifyContent: 'space-between', marginTop: 20 }]}>
                <Pressable
                  style={globalStyles.redButton}
                  onPress={() => setDeleteModal(!deleteModal)}
                >
                  <Text style={[globalStyles.text]}>Supprimer</Text>
                </Pressable>
                <Pressable
                  style={globalStyles.blueButton}
                  onPress={submitUpdateExpense}
                >
                  <Text style={[globalStyles.text]}>Modifier la dépense</Text>
                </Pressable>
              </View>

              <Modal
                animationType="slide"
                transparent={true}
                visible={deleteModal}
                onRequestClose={() => {
                  setDeleteModal(!deleteModal);
                }}
              >
                <View style={styles.deleteModalView}>
                <View style={styles.deleteModalContent}>
                  <Text style={styles.textDelete}>Voulez-vous vraiment supprimer la dépense : {expense.description} ?</Text>
                  <View style={styles.buttonsDelete}>
                    <Pressable style={globalStyles.greyButton} onPress={() => {
                      setDeleteModal(!deleteModal);
                    }}>
                      <Text style={globalStyles.text}>Annuler</Text>
                    </Pressable>

                    <Pressable style={globalStyles.redButton} onPress={deleteExpense}>
                      <Text style={globalStyles.text}>Supprimer</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
              </Modal>

            </View>
          </View>
        </View>
      </Modal>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  modalEdit: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  modalEditView: {
    flex: 1,
    backgroundColor: 'black',
    padding: 35,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  closeModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  inputField: {
    gap: 15
  },
  deleteModalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  deleteModalContent: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textDelete:{
    fontSize: 20,
    textAlign: 'center'
  },
  subTextDelete:{
    fontStyle: 'italic'
  },
  buttonsDelete: {
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

export default ModalEditExpenses;