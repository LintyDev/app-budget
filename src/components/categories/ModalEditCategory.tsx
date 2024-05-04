import globalStyles from "@/styles/globalStyles";
import { Dimensions, Keyboard, Modal, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react";
import Category, { CategoryWithExpenses } from "@/types/categories";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks";
import ColorPicker, { HueSlider, Panel1, Preview } from "reanimated-color-picker";
import CategoriesService from "@/services/categories.services";
import { getAccount } from "@/features/accounts/accountsSlice";

function ModalEditCategory(props: { category: CategoryWithExpenses, setCategory : React.Dispatch<React.SetStateAction<CategoryWithExpenses | null>>, open: boolean, close: React.Dispatch<React.SetStateAction<boolean>> }) {
  const windowHeight = Dimensions.get('window').height;
  const heightModal = (75 * windowHeight) / 100;
  const account = useAppSelector((state) => state.accounts[0]);
  const dispatch = useAppDispatch();
  const { category, open, close, setCategory } = props;
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
      console.log('tu ne peux pas mettre ce montant');
      return;
    }
    try {
      const updateCat = await new CategoriesService().updateCategory({...dataCat, currentAmount: dataCat.amountAllocated - diff});
      if(updateCat) {
        // reset account
        const updatedData : CategoryWithExpenses = {...category, ...dataCat, currentAmount: dataCat.amountAllocated - diff};
        setCategory(updatedData);
        await dispatch(getAccount());
        close(!open);
      }
    } catch (error) {
      console.log('erreur');
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

            <View style={{ alignItems: "flex-end", marginTop: 20 }}>
              <Pressable
                style={[globalStyles.blueButton]}
                onPress={submitUpdateCat}
              >
                <Text style={[globalStyles.text]}>Modifier la catégorie</Text>
              </Pressable>
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
  }
});

export default ModalEditCategory;