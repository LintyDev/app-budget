import globalStyles from "@/styles/globalStyles";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign, MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useAppSelector } from "@/hooks/redux.hooks";
import { useEffect } from "react";
import { router } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';
import { ProgressChart } from "react-native-chart-kit";
import { AbstractChartConfig } from "react-native-chart-kit/dist/AbstractChart";

// TODO
// Si pas de compte en bdd => icon plus pour add + message
// Afficher les comptes 
// Si goal dans comptes => Carroussel 1 . comptes / 2 . goals
// Comptes: initalAmount, currentAmount, monthYear => Click go to Dashboard/account?id=

function Accounts() {
  const accounts = useAppSelector((state) => state.accounts);
  const account = accounts[0];
  const percentData = (((account.initalAmount - account.currentAmount) * 100) / account.initalAmount) / 100;
  // const percentData = (((1200 - 1100) * 100) / 1200) / 100;
  const accountName = account.name.length < 14 ? account.name : `${account.name.substring(0, 13)}...`;
  console.log(percentData);

  const data = {
    data: [percentData]
  };

  const chartConfig : AbstractChartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    useShadowColorFromDataset: false
  }

  useEffect(() => {
    console.log(accounts);
  }, []);

  if (accounts.length > 0) {
    return (
      <View style={[styles.containerCard]}>
        <ImageBackground
          source={require("@assets/noise.png")}
          style={styles.ImgBackGround}
          resizeMode="repeat"
          borderRadius={15}
        >
          <LinearGradient
            colors={["rgba(188, 82, 170, 0.64)", "rgba(202, 68, 113, 0.71)"]}
            // colors={['rgba(26, 255, 146, 0.64)', 'rgba(118, 51, 106, 0.71)']}
            // colors={['green', 'blue']}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={styles.background}
          />
          <View style={styleCard.AccountCardContent}>
            <View style={styles.stats}>

              <View style={[styleCard.iconTextName]}>
                <MaterialIcons name="account-balance" size={28} color="black" />
                <Text numberOfLines={1} ellipsizeMode="tail" style={[styleCard.account]}>{accountName}</Text>
              </View>
              <View style={[styleCard.iconText]}>
                <AntDesign name="calendar" size={16} color="black" />
                <Text>{account.currentMonthYear}</Text>
              </View>

              <View style={[styleCard.iconText, styleCard.currentAmount]}>
                <FontAwesome5 name="euro-sign" size={38} color="black" />
                <Text style={styleCard.currentAmountText}>{account.currentAmount}</Text>
              </View>

            </View>
            <View style={[styles.chart]}>

              <View style={[styleCard.iconText, styleCard.initialAmount]}>
                <MaterialCommunityIcons name="cash-plus" size={16} color="black" />
                <Text>{account.initalAmount}</Text>
              </View>
              <View style={[styleCard.iconText, styleCard.countCat]}>
                <MaterialIcons name="account-tree" size={16} color="black" />
                <Text>{account.countCategories}</Text>
              </View>
              <ProgressChart
                data={data}
                width={155}
                height={155}
                strokeWidth={20}
                radius={55}
                chartConfig={chartConfig}
                hideLegend={true}
              />

            </View>
          </View>
        </ImageBackground>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.addbutton}>
          <Pressable onPress={() => router.navigate('/dashboard/account/create')}>
            <AntDesign name="pluscircle" size={48} color="white" />
          </Pressable>
          <Text style={globalStyles.text}>Ajouter un compte</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 155,
    borderRadius: 15,
    padding: 15,
    marginTop: 10
  },
  containerCard: {
    height: 155,
    borderRadius: 15,
    marginTop: 10
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 155,
    borderRadius: 15
  },
  ImgBackGround: {
    flex: 1,
  },
  addbutton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  stats: {
    width: '60%',
    paddingVertical: 15,
    paddingLeft: 15
  },
  chart: {
    width: '40%'
  }
});

const styleCard = StyleSheet.create({
  AccountCardContent: {
    flexDirection: 'row',
  },
  iconText:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  iconTextName:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  titleMonth: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  account: {
    fontSize: 30
  },
  currentAmount: {
    position: 'absolute',
    bottom: 10,
    left: 15,
  },
  currentAmountText: {
    fontSize: 48
  },
  initialAmount: {
    position: 'absolute',
    top: '40%',
    left: 50,
    right: 0,
    textAlign: 'center'
  },
  countCat: {
    position: 'absolute',
    top: '50%',
    left: 50,
    right: 0,
    textAlign: 'center'
  },
});

export default Accounts;