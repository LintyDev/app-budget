import globalStyles from "@/styles/globalStyles";
import { Dimensions, Keyboard, Modal, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Expense } from "@/types/accounts";

function ModalEditExpenses(props: { expense : Expense, open: boolean, close: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { expense, open, close } = props;
  const windowHeight = Dimensions.get('window').height;
  const heightModal = (75 * windowHeight) / 100;

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
              <Text style={globalStyles.text}>Modifier la dépense {expense.description}</Text>
              <Pressable onPress={() => close(!open)} style={[globalStyles.flexRow, { gap: 5 }]}>
                <Text style={globalStyles.text}>Fermer</Text>
                <AntDesign name="closecircleo" size={18} color="white" />
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

export default ModalEditExpenses;