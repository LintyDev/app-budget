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

  const chartConfig : AbstractChartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    useShadowColorFromDataset: false
  }

  if (accounts.length > 0) {
    const percentData = (((account.initalAmount - account.currentAmount) * 100) / account.initalAmount) / 100;
    const accountName = account.name.length < 14 ? account.name : `${account.name.substring(0, 13)}...`;
    const data = {
      data: [percentData]
    };

    return (
      <View style={[styles.containerCard]}>
        <ImageBackground
          source={require("@assets/texture.jpg")}
          style={styles.ImgBackGround}
          resizeMode="cover"
          borderRadius={15}
        >
          <LinearGradient
            // colors={["rgba(188, 82, 170, 0.00)", "rgba(202, 68, 113, 0.71)"]}
            colors={["rgba(0, 0, 0, 0.5)", "rgba(168, 31, 146, 0.5)"]}
            // colors={["rgba(0, 0, 0, 0.5)", "rgba(202, 68, 113, 0.71)"]}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={styles.background}
          />
            <Pressable onPress={() => {
              router.push('/categories/')
            }}>
          <View style={styleCard.AccountCardContent}>
              <View style={styles.stats}>
                <View style={styleCard.topTitle}>
                  <View style={[styleCard.iconTextName]}>
                    <MaterialIcons name="account-balance" size={16} color="white" />
                    <Text numberOfLines={1} ellipsizeMode="tail" style={[styleCard.account, globalStyles.text]}>{account.name}</Text>
                  </View>
                  <View style={[styleCard.iconText]}>
                    <AntDesign name="calendar" size={16} color="white" />
                    <Text style={globalStyles.text}>{account.currentMonthYear}</Text>
                  </View>
                </View>
                <View style={[styleCard.iconText, styleCard.currentAmount]}>
                  <FontAwesome5 name="euro-sign" size={38} color="white" />
                  <Text style={[styleCard.currentAmountText, globalStyles.text]}>{parseFloat(account.currentAmount.toFixed(2))}</Text>
                </View>
              </View>

              <View style={[styles.chart]}>
                <View style={[styleCard.iconText, styleCard.initialAmount]}>
                  <MaterialCommunityIcons name="cash-plus" size={16} color="white" />
                  <Text style={globalStyles.text}>{account.initalAmount}</Text>
                </View>
                <View style={[styleCard.iconText, styleCard.countCat]}>
                  <MaterialCommunityIcons name="wallet" size={16} color="white" />
                  <Text style={globalStyles.text}>{account.countCategories}</Text>
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
            </Pressable>
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
    opacity: 1
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
    gap: 5,
  },
  titleMonth: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  account: {
    fontSize: 16
  },
  currentAmount: {
    position: 'absolute',
    bottom: 10,
    left: 15,
    // backgroundColor: 'rgba(0, 0, 0, 0.3)',
    // paddingVertical: 5,
    // paddingHorizontal: 15,
    // borderRadius: 30,
    gap: 15
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
  topTitle: {
    // backgroundColor: 'rgba(0, 0, 0, 0.3)',
    // padding: 5,
    // borderRadius: 10,
  }
});

export default Accounts;