import * as React from "react";
import {
  Image,
  StyleSheet,
  StatusBar,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize } from "../GlobalStyles";

const UserScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.userscreen}>
      <Image
        style={[styles.CornerShapeIcon, styles.CornerShapeIconPosition]}
        resizeMode="contain"
        source={require("../assets/CornerShape.png")}
      />
      <StatusBar barStyle="default" />
      <Text style={styles.chooseAccountType}>Choose Account Type</Text>
      <TouchableOpacity 
      style={[styles.barberRectangleShape, styles.barberRectangle]}
      onPress={() => navigation.navigate("SalonRegistrationScreen")}
      activeOpacity={0.2}>
        <View>
      <View>
        <View
          style={[
            styles.bRectangleShape,
            styles.barberRectangle,
            styles.CornerShapeIconPosition,
          ]}
        >
         <Image
        style={[styles.barberIcon]}
        resizeMode="contain"
        source={require("../assets/barberVector.png")}
      />  
        </View>
        <Text style={[styles.salon1, styles.usersName]}>Salon</Text>
      </View>
      </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.customerRectangleShape}
        activeOpacity={0.2}
        onPress={() => navigation.navigate("RegistrationScreen")}
      >
        <Image
          style={styles.userVectorIcon}
          resizeMode="cover"
          source={require("../assets/userVector.png")}
        />
        <Text style={[styles.customer, styles.usersName]}>Customer</Text>
      </TouchableOpacity>
      <Text style={styles.rapidSaloonServiceContainer}>
        <Text style={styles.rapidSaloonService}>Rapid saloon Service.</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  
  barberRectangle: {
    width: 159,
    position: "absolute",
  },
  barberIcon:{
    height:150,
    width: 150,
  },
  usersName: {
    height: 32,
    fontFamily: FontFamily.poppinsSemibold,
    fontWeight: "600",
    color: Color.black,
    textAlign: "center",
    fontSize: FontSize.size_5xl,
    position: "absolute",
  },
  CornerShapeIcon: {
    top: -12,
    left: -20,
    width: 230,
    height: 180,
    position: "absolute",
  },
  chooseAccountType: {
    top: 274,
    left: 48,
    color: "#f2ab96",
    width: 271,
    height: 51,
    textAlign: "center",
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    fontSize: FontSize.size_5xl,
    position: "absolute",
  },
  
  bRectangleShape: {
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    height: 137,
    overflow: "hidden",
    
  },
  salon1: {
    top: 150,
    left: 19,
    width: 120,
  },
  barberRectangleShape: {
    top: 352,
    left: 20,
    height: 182,
  },
  userVectorIcon: {
    top: -1,
    left: -1,
    width: 143,
    height: 136,
    position: "absolute",
    overflow: "hidden",
  },
  customer: {
    top: 148,
    left: 7,
    width: 134,
  },
  customerRectangleShape: {
    top: 352,
    left: 200,
    width: 141,
    height: 166,
    position: "absolute",
  },
  
  rapidSaloonServiceContainer: {
    top: 224,
    fontSize: 26,
    width: 417,
    height: 38,
    fontFamily: FontFamily.poppinsSemibold,
    fontWeight: "600",
    color: Color.black,
    textAlign: "center",
    left: -18,
    position: "absolute",
  },
  userscreen: {
    backgroundColor: Color.white,
    flex: 1,
    height: 926,
    overflow: "hidden",
    width: "100%",
  },
});

export default UserScreen;
