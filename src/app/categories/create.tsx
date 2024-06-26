import GoBack from "@/components/common/GoBack";
import { updateAccount } from "@/features/accounts/accountsSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks";
import globalStyles from "@/styles/globalStyles";
import { InputCategory } from "@/types/categories";
import { useState } from "react";
import { Alert, Keyboard, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import ColorPicker, { HueSlider, Panel1, Preview } from "reanimated-color-picker";
import {Picker} from '@react-native-picker/picker';
import CategoriesService from "@/services/categories.services";
import { router } from "expo-router";

function CategoryCreatePage() {
  const accounts = useAppSelector((state) => state.accounts);
  const dispatch = useAppDispatch();
  const account = accounts[0];

  const [dataCat, setDataCat] = useState<InputCategory>({
    name: '',
    color: '#ffffff',
    amountAllocated: 0,
    currentAmount: 0,
    accountId: 1
  });

  const onSelectedColor = ({hex} : {hex: string}) => {
    setDataCat(prev => ({...prev, color: hex}));
  }

  const submitCat = async () => {
    try {
      if (dataCat.amountAllocated && dataCat.amountAllocated > account.allocatedRemainingAmount) {
        Alert.alert('Tu as dépassé le montant restant à allouer!','', [{ text: 'Ok' }]);
        return;
      }
      if(dataCat.color === '' || dataCat.name === '' || dataCat.currentAmount === 0) {
        Alert.alert('Remplir tous les champs!','', [{ text: 'Ok' }]);
        return;
      }
      const addCat = await new CategoriesService().addCategory(dataCat);
      if(addCat) {
        const acc = accounts.find(x => x.id === dataCat.accountId);
        if (acc) {
          const updateAcc = await dispatch(updateAccount({id: dataCat.accountId, data: {...acc, countCategories: acc.countCategories + 1}}));
          if (updateAcc) {
            router.replace('/categories/');
          }
        }
      }
    } catch (error) {
      console.log('failed to saved category', error);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={[globalStyles.container, styles.container]}>
        <GoBack title="Ajouter une catégorie" link="/categories/" />

        <View style={styles.colorPicker}>
          <Text style={[globalStyles.text, styles.textCP]}>
            Choisir une couleur pour la catégorie
          </Text>
          <ColorPicker style={{ gap: 10 }} onComplete={onSelectedColor}>
            <HueSlider />
            <Panel1 style={{ height: 150 }} />
            <Preview hideInitialColor={true} hideText={true} />
          </ColorPicker>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={globalStyles.input}
            placeholder="Nom de la catégorie (e.g Courses)"
            onChangeText={(text) => {
              setDataCat(prev => ({...prev, name: text}));
            }}
          />
          <Text style={globalStyles.text}>Montant restant à allouer : {account.allocatedRemainingAmount}</Text>
          <TextInput
            style={globalStyles.input}
            inputMode={"numeric"}
            keyboardType={"number-pad"}
            placeholder="Montant alloué (e.g 500)"
            onChangeText={(text) => {
              setDataCat(prev => ({...prev, amountAllocated: +text, currentAmount: +text}));
            }}
          />
          <Text style={[globalStyles.text, styles.textItalic]}>Choisir le compte associé :</Text>
          <Picker
            selectedValue={dataCat.accountId.toString()}
            onValueChange={(itemValue : string, itemIndex) => {
              setDataCat(prev => ({...prev, accountId: +itemValue}));
            }
            }
            style={{height: 120}}
            itemStyle={{height: 120}}
          >
            {accounts.map((v) => {
              return (
                <Picker.Item label={v.name} value={v.id} key={v.id} color="white"/>
              )
            })}
          </Picker>

          <View style={{ alignItems: "flex-end" }}>
            <Pressable
              style={[globalStyles.greenButton]}
              onPress={submitCat}
            >
              <Text style={[globalStyles.text]}>Créer la catégorie</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10
  },
  colorPicker: {
    paddingHorizontal: 100,
    marginBottom: 20
  },
  textCP: {
    textAlign: 'center',
    marginVertical: 10
  },
  inputContainer: {
    gap: 15
  },
  textItalic: {
    fontStyle: 'italic',
    fontSize: 12,
    color: 'grey'
  }
});

export default CategoryCreatePage;