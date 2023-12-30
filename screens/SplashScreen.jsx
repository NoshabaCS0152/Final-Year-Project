import * as React from "react";
import {
  Image,
  StyleSheet,
  StatusBar,
  Text,
  Pressable,
  View,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import { Button } from "react-native-elements";
import firestore from '@react-native-firebase/firestore';
//import { initializeApp } from "firebase/app";
import {getFirestore, setDoc, doc} from 'firebase/firestore'
//import sendDataToFirebase from '../App'



const SplashScreen = () => {
  const navigation = useNavigation();
 



  
  

  return (

    

    <View style={styles.splashScreen}>
   

      
      <Image
        style={styles.CornerShapeIcon}
        resizeMode="contain"
        source={require("../assets/CornerShape.png")}
      />
      <StatusBar style={styles.buttonLayout} barStyle="default" />
      <Image
        style={styles.barberVectorIcon}
        resizeMode="cover"
        source={require("../assets/barberVector.png")}
      />
      <Text style={styles.rapidSaloonServiceContainer}>
        <Text style={styles.rapidSaloonService}>Rapid saloon Service.</Text>
      </Text>
      <Text style={[styles.loremIpsumIs, styles.getStartedLayout]}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s
      </Text>
      <TouchableOpacity
        style={[styles.button, styles.buttonLayout]}
        activeOpacity={0.2}
        onPress={() => navigation.navigate("UserScreen")}
      >
        <View style={[styles.buttonChild, styles.getStartedPosition]} />
        <Text
          style={[
            styles.getStarted,
            styles.getStartedPosition,
            styles.getStartedLayout,
          ]}
        >
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonLayout: {
    width: 310,
    position: "absolute",
  },
  getStartedLayout: {
    lineHeight: 26,
    textAlign: "center",
  },
  getStartedPosition: {
    left: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  CornerShapeIcon: {
    top: -12,
    left: -20,
    width: 230,
    height: 180,
    position: "absolute",
  },
  barberVectorIcon: {
    top: 185,
    left: 39,
    width: 275,
    height: 235,
    position: "absolute",
    overflow: "hidden",
  },
  rapidSaloonService: {
    marginBlockStart: 0,
    marginBlockEnd: 20,
  },
  rapidSaloonServiceContainer: {
    top: 450,
    left: 50,
    color: Color.black,
    width: 229,
    height: 30,
    textAlign: "center",
    fontFamily: FontFamily.poppinsSemibold,
    fontWeight: "600",
    fontSize: FontSize.size_3xl,
    position: "absolute",
  },
  loremIpsumIs: {
    top: 480,
    left: 32,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.gray_100,
    width: 281,
    height: 97,
    position: "absolute",
  },
  buttonChild: {
    right: "0%",
    bottom: "0%",
    backgroundColor: Color.coral,
  },
  getStarted: {
    color: Color.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: FontFamily.poppinsSemibold,
    fontWeight: "600",
    fontSize: FontSize.size_3xl,
    top: "0%",
    height: "100%",
    lineHeight: 26,
    marginTop: 15,
  },
  button: {
    top: 600,
    left: 25,
    height: 61,
  },
  splashScreen: {
    backgroundColor: Color.white,
    flex: 1,
    height: 926,
    overflow: "hidden",
    width: "100%",
  },
});

export default SplashScreen;
