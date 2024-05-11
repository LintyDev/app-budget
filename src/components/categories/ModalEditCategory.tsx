import globalStyles from "@/styles/globalStyles";
import { Alert, Dimensions, Keyboard, Modal, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react";
import Category, { CategoryWithExpenses } from "@/types/categories";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks";
import ColorPicker, { HueSlider, Panel1, Preview } from "reanimated-color-picker";
import CategoriesService from "@/services/categories.services";
import { getAccount, updateAccount } from "@/features/accounts/accountsSlice";
import ExpensesService from "@/services/expenses.services";
import Account from "@/types/accounts";
import { router } from "expo-router";

function ModalEditCategory(props: { category: CategoryWithExpenses, setCategory: React.Dispatch<React.SetStateAction<CategoryWithExpenses | null>>, open: boolean, close: React.Dispatch<React.SetStateAction<boolean>> }) {
  const windowHeight = Dimensions.get('window').height;
  const heightModal = (75 * windowHeight) / 100;
  const account = useAppSelector((state) => state.accounts[0]);
  const dispatch = useAppDispatch();
  const { category, open, close, setCategory } = props;
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [dataCat, setDataCat] = useState<Category>({
    id: category.id,
    name: category.name,
    color: category.color,
    amountAllocated: category.amountAllocated,
    currentAmount: category.currentAmount,
    accountId: category.accountId
  });
  const diff = category.amountAllocated - category.currentAmount;

  const onSelectedColor = ({ hex }: { hex: string }) => {
    setDataCat(prev => ({ ...prev, color: hex }));
  }

  const submitUpdateCat = async () => {
    const allocatedWithoutCurrent = account.allocatedRemainingAmount + category.amountAllocated;
    if (dataCat.amountAllocated > allocatedWithoutCurrent || dataCat.amountAllocated < diff) {
      Alert.alert('Le montant est trop grand!','', [{ text: 'Ok' }]);
      return;
    }
    if (dataCat.name === '' || dataCat.amountAllocated === 0) {
      Alert.alert('Remplir tous les champs','', [{ text: 'Ok' }]);
      return;
    }
    try {
      const updateCat = await new CategoriesService().updateCategory({ ...dataCat, currentAmount: dataCat.amountAllocated - diff });
      if (updateCat) {
        // reset account
        const updatedData: CategoryWithExpenses = { ...category, ...dataCat, currentAmount: dataCat.amountAllocated - diff };
        setCategory(updatedData);
        await dispatch(getAccount());
        close(!open);
      }
    } catch (error) {
      console.log('erreur');
    }
  }

  const deleteCat = async () => {
    const newAmount = account.currentAmount + (category.amountAllocated - category.currentAmount);
      const updatedAccount : Account = {
        ...account,
        currentAmount: newAmount,
        countCategories: account.countCategories - 1
      };
    try {
      if (category.expenses) {
        const deleteExpenses = await new ExpensesService().deleteExpenseByCategoryId(category.id, account.currentMonthYear);
        if (!deleteExpenses) {
          console.log('Unable to delete expenses');
          return;
        }
      }
      const deleteCat = await new CategoriesService().deleteCategory(category.id, category.name, (category.amountAllocated - category.currentAmount));
      if(!deleteCat) {
        console.log('unable to delete category');
        return;
      }

      await dispatch(updateAccount({id: 1, data: updatedAccount}));
      router.push('/categories/');
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
              <Text style={globalStyles.text}>Modifier la catégorie</Text>
              <Pressable onPress={() => close(!open)} style={[globalStyles.flexRow, { gap: 5 }]}>
                <Text style={globalStyles.text}>Fermer</Text>
                <AntDesign name="closecircleo" size={18} color="white" />
              </Pressable>
            </View>

            <View style={styles.inputField}>
              <ColorPicker style={{ gap: 10 }} onComplete={onSelectedColor} value={dataCat.color}>
                <HueSlider />
                <Panel1 style={{ height: 150 }} />
                <Preview hideInitialColor={true} hideText={true} />
              </ColorPicker>

              <TextInput
                style={globalStyles.input}
                placeholder="Nom de la catégorie (e.g Courses)"
                value={dataCat.name}
                onChangeText={(text) => {
                  setDataCat(prev => ({ ...prev, name: text }));
                }}
              />

              <TextInput
                style={globalStyles.input}
                inputMode={"numeric"}
                keyboardType={"number-pad"}
                placeholder="Montant alloué (e.g 500)"
                value={`${dataCat.amountAllocated}`}
                onChangeText={(text) => {
                  setDataCat(prev => ({ ...prev, amountAllocated: +text }));
                }}
              />
            </View>

            <View style={[globalStyles.flexRow, { justifyContent: 'space-between', marginTop: 20 }]}>
              <Pressable
                style={[globalStyles.redButton]}
                onPress={() => setDeleteModal(!deleteModal)}
              >
                <Text style={[globalStyles.text]}>Supprimer</Text>
              </Pressable>
              <Pressable
                style={[globalStyles.blueButton]}
                onPress={submitUpdateCat}
              >
                <Text style={[globalStyles.text]}>Modifier la catégorie</Text>
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
                  <Text style={styles.textDelete}>Voulez-vous vraiment supprimer la catégorie : {dataCat.name} ?</Text>
                  <Text style={styles.subTextDelete}>Cela entrainera la suppression de toutes les dépenses du mois liés à cette catégorie.</Text>
                  
                  <View style={styles.buttonsDelete}>
                    <Pressable style={globalStyles.greyButton} onPress={() => {
                      setDeleteModal(!deleteModal);
                    }}>
                      <Text style={globalStyles.text}>Annuler</Text>
                    </Pressable>

                    <Pressable style={globalStyles.redButton} onPress={deleteCat}>
                      <Text style={globalStyles.text}>Supprimer</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>

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

export default ModalEditCategory;