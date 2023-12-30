import * as React from "react";
import {
  View,
  Image,
  StyleSheet,
  StatusBar,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize } from "../GlobalStyles";

const UserScreen = ({ onClose }) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.userscreen, styles.vectorIconLayout]}>
      <Image
        style={[styles.shapeIcon, styles.shapeIconPosition]}
        resizeMode="cover"
        source={require("../assets/shape.png")}
      />
      <StatusBar barStyle="default" />
      <Text style={styles.chooseAccountType}>Choose Account Type</Text>
      <Pressable
        style={[styles.undrawBarber3Uel1Parent, styles.undrawLayout]}
        onPress={() => navigation.navigate("SalonLogIn")}
      >
        <View style={[styles.undrawBarber3Uel1, styles.undrawLayout]}>
          <Image
            style={[styles.vectorIcon, styles.vectorIconLayout]}
            resizeMode="cover"
            source={require("../assets/vector2.png")}
          />
          <Image
            style={[styles.vectorIcon1, styles.vectorIconPosition4]}
            resizeMode="cover"
            source={require("../assets/vector3.png")}
          />
          <Image
            style={[styles.vectorIcon2, styles.vectorIconLayout]}
            resizeMode="cover"
            source={require("../assets/vector4.png")}
          />
          <Image
            style={[styles.vectorIcon3, styles.vectorIconLayout]}
            resizeMode="cover"
            source={require("../assets/vector5.png")}
          />
          <Image
            style={[styles.vectorIcon4, styles.vectorIconLayout]}
            resizeMode="cover"
            source={require("../assets/vector6.png")}
          />
          <Image
            style={[styles.vectorIcon5, styles.vectorIconLayout]}
            resizeMode="cover"
            source={require("../assets/vector7.png")}
          />
          <Image
            style={[styles.vectorIcon6, styles.vectorIconLayout]}
            resizeMode="cover"
            source={require("../assets/vector8.png")}
          />
          <Image
            style={styles.vectorIconPosition3}
            resizeMode="cover"
            source={require("../assets/vector9.png")}
          />
          <Image
            style={[styles.vectorIcon8, styles.vectorIconPosition3]}
            resizeMode="cover"
            source={require("../assets/vector10.png")}
          />
          <Image
            style={[styles.vectorIcon9, styles.vectorIconLayout]}
            resizeMode="cover"
            source={require("../assets/vector11.png")}
          />
          <Image
            style={[styles.vectorIcon10, styles.vectorIconLayout]}
            resizeMode="cover"
            source={require("../assets/vector12.png")}
          />
          <Image
            style={[styles.vectorIcon11, styles.vectorIconLayout]}
            resizeMode="cover"
            source={require("../assets/vector13.png")}
          />
          <Image
            style={styles.vectorIconPosition2}
            resizeMode="cover"
            source={require("../assets/vector14.png")}
          />
          <Image
            style={[styles.vectorIcon13, styles.vectorIconPosition2]}
            resizeMode="cover"
            source={require("../assets/vector15.png")}
          />
          <Image
            style={[styles.vectorIcon14, styles.vectorIconLayout]}
            resizeMode="cover"
            source={require("../assets/vector16.png")}
          />
          <Image
            style={[styles.vectorIcon15, styles.vectorIconLayout]}
            resizeMode="cover"
            source={require("../assets/vector17.png")}
          />
          <Image
            style={[styles.vectorIcon16, styles.vectorIconLayout]}
            resizeMode="cover"
            source={require("../assets/vector18.png")}
          />
          <Image
            style={[styles.vectorIcon17, styles.vectorIconPosition1]}
            resizeMode="cover"
            source={require("../assets/vector19.png")}
          />
          <Image
            style={[styles.vectorIcon18, styles.vectorIconPosition4]}
            resizeMode="cover"
            source={require("../assets/vector20.png")}
          />
          <Image
            style={[styles.vectorIcon19, styles.vectorIconLayout]}
            resizeMode="cover"
            source={require("../assets/vector21.png")}
          />
          <Image
            style={[styles.vectorIcon20, styles.vectorIconLayout]}
            resizeMode="cover"
            source={require("../assets/vector22.png")}
          />
          <Image
            style={styles.vectorIconPosition}
            resizeMode="cover"
            source={require("../assets/vector23.png")}
          />
          <Image
            style={[styles.vectorIcon22, styles.vectorIconPosition]}
            resizeMode="cover"
            source={require("../assets/vector24.png")}
          />
          <Image
            style={[styles.vectorIcon23, styles.vectorIconLayout]}
            resizeMode="cover"
            source={require("../assets/vector25.png")}
          />
          <Image
            style={[styles.vectorIcon24, styles.iconPosition]}
            resizeMode="cover"
            source={require("../assets/vector26.png")}
          />
          <Image
            style={[styles.vectorIcon25, styles.vectorIconPosition1]}
            resizeMode="cover"
            source={require("../assets/vector27.png")}
          />
          <Image
            style={[styles.vectorIcon26, styles.vectorIconLayout]}
            resizeMode="cover"
            source={require("../assets/vector28.png")}
          />
          <Image
            style={[styles.vectorIcon27, styles.vectorIconLayout]}
            resizeMode="cover"
            source={require("../assets/vector29.png")}
          />
          <Image
            style={[styles.vectorIcon28, styles.vectorIconLayout]}
            resizeMode="cover"
            source={require("../assets/vector30.png")}
          />
          <Image
            style={[styles.vectorIcon29, styles.vectorIconLayout]}
            resizeMode="cover"
            source={require("../assets/vector31.png")}
          />
          <Image
            style={[styles.vectorIcon30, styles.vectorIconLayout]}
            resizeMode="cover"
            source={require("../assets/vector32.png")}
          />
          <Image
            style={[styles.vectorIcon31, styles.vectorIconLayout]}
            resizeMode="cover"
            source={require("../assets/vector33.png")}
          />
          <Image
            style={[styles.vectorIcon32, styles.vectorIconLayout]}
            resizeMode="cover"
            source={require("../assets/vector34.png")}
          />
          <Image
            style={[styles.vectorIcon33, styles.vectorIconLayout]}
            resizeMode="cover"
            source={require("../assets/vector35.png")}
          />
          <Image
            style={[styles.vectorIcon34, styles.vectorIconLayout]}
            resizeMode="cover"
            source={require("../assets/vector36.png")}
          />
          <Image
            style={[styles.vectorIcon35, styles.vectorIconLayout]}
            resizeMode="cover"
            source={require("../assets/vector37.png")}
          />
          <Image
            style={[styles.vectorIcon36, styles.vectorIconLayout]}
            resizeMode="cover"
            source={require("../assets/vector38.png")}
          />
          <Image
            style={[styles.groupIcon, styles.iconPosition]}
            resizeMode="cover"
            source={require("../assets/group.png")}
          />
          <Text style={styles.salon}>Salon</Text>
        </View>
        <Text style={[styles.salon1, styles.salon1Typo]}>Salon</Text>
      </Pressable>
      <TouchableOpacity
        style={styles.undrawMaleAvatarG98d1Parent}
        activeOpacity={0.2}
        onPress={() => navigation.navigate("RegistrationScreen")}
      >
        <Image
          style={styles.undrawMaleAvatarG98d1Icon}
          resizeMode="cover"
          source={require("../assets/undraw-male-avatar-g98d-1.png")}
        />
        <Text style={[styles.customer, styles.salon1Typo]}>Customer</Text>
      </TouchableOpacity>
      <Text style={styles.rapidSaloonService}>{`Rapid saloon Service.
`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  vectorIconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  shapeIconPosition: {
    left: 0,
    top: 0,
  },
  undrawLayout: {
    width: 159,
    position: "absolute",
  },
  vectorIconPosition4: {
    left: "63.84%",
    position: "absolute",
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  vectorIconPosition3: {
    left: "45.22%",
    bottom: "64.95%",
    right: "48.62%",
    top: "31.35%",
    width: "6.16%",
    height: "3.7%",
    position: "absolute",
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  vectorIconPosition2: {
    left: "60.35%",
    bottom: "59.96%",
    right: "33.72%",
    top: "30.02%",
    width: "5.93%",
    height: "10.02%",
    position: "absolute",
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  vectorIconPosition1: {
    top: "56.49%",
    position: "absolute",
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  vectorIconPosition: {
    left: "73.86%",
    bottom: "0.05%",
    right: "22.3%",
    top: "80.78%",
    width: "3.85%",
    height: "19.17%",
    position: "absolute",
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  iconPosition: {
    left: "58.74%",
    bottom: "80.04%",
    right: "26.98%",
    width: "14.28%",
    position: "absolute",
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  salon1Typo: {
    height: 32,
    fontFamily: FontFamily.poppinsSemibold,
    fontWeight: "600",
    color: Color.black,
    textAlign: "center",
    fontSize: FontSize.size_5xl,
    position: "absolute",
  },
  shapeIcon: {
    width: 309,
    height: 258,
    position: "absolute",
  },
  chooseAccountType: {
    top: 364,
    left: 78,
    color: "#f2ab96",
    width: 271,
    height: 51,
    textAlign: "center",
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    fontSize: FontSize.size_5xl,
    position: "absolute",
  },
  vectorIcon: {
    height: "86.3%",
    width: "100%",
    top: "13.7%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    opacity: 0.1,
    position: "absolute",
  },
  vectorIcon1: {
    height: "13.01%",
    width: "8.59%",
    top: "14.94%",
    right: "27.57%",
    bottom: "72.04%",
  },
  vectorIcon2: {
    height: "17.62%",
    width: "11.01%",
    top: "39.64%",
    right: "46.28%",
    bottom: "42.73%",
    left: "42.71%",
    position: "absolute",
  },
  vectorIcon3: {
    height: "10.53%",
    width: "7.39%",
    top: "50.98%",
    right: "46.54%",
    bottom: "38.49%",
    left: "46.07%",
    position: "absolute",
  },
  vectorIcon4: {
    height: "18.9%",
    width: "12.79%",
    top: "35.13%",
    right: "45.44%",
    bottom: "45.97%",
    left: "41.77%",
    position: "absolute",
  },
  vectorIcon5: {
    height: "11.82%",
    width: "4.64%",
    top: "49.94%",
    right: "52.54%",
    bottom: "38.24%",
    left: "42.82%",
    position: "absolute",
  },
  vectorIcon6: {
    height: "2.8%",
    width: "1.84%",
    top: "51.39%",
    right: "55.24%",
    bottom: "45.81%",
    left: "42.92%",
    position: "absolute",
  },
  vectorIcon8: {
    opacity: 0.1,
  },
  vectorIcon9: {
    height: "7.42%",
    width: "4.51%",
    top: "28.97%",
    right: "49.73%",
    bottom: "63.61%",
    left: "45.76%",
    position: "absolute",
  },
  vectorIcon10: {
    height: "0.36%",
    width: "0.23%",
    top: "32.84%",
    right: "51.62%",
    bottom: "66.8%",
    left: "48.16%",
    opacity: 0.1,
    position: "absolute",
  },
  vectorIcon11: {
    height: "11.79%",
    width: "14.39%",
    top: "25.81%",
    right: "37.3%",
    bottom: "62.4%",
    left: "48.32%",
    position: "absolute",
  },
  vectorIcon13: {
    opacity: 0.1,
  },
  vectorIcon14: {
    height: "11.21%",
    width: "10.53%",
    top: "73.93%",
    right: "60.51%",
    bottom: "14.86%",
    left: "28.95%",
    position: "absolute",
  },
  vectorIcon15: {
    height: "8.65%",
    width: "5.83%",
    top: "77.5%",
    right: "69.99%",
    bottom: "13.85%",
    left: "24.17%",
    position: "absolute",
  },
  vectorIcon16: {
    height: "23.18%",
    width: "9.38%",
    top: "76.76%",
    right: "38.5%",
    bottom: "0.07%",
    left: "52.12%",
    position: "absolute",
  },
  vectorIcon17: {
    height: "43.5%",
    width: "38.93%",
    right: "39.53%",
    bottom: "0.01%",
    left: "21.54%",
  },
  vectorIcon18: {
    height: "8.75%",
    width: "7.31%",
    top: "14.95%",
    right: "28.85%",
    bottom: "76.3%",
    opacity: 0.1,
  },
  vectorIcon19: {
    height: "18.74%",
    width: "11.71%",
    top: "4.67%",
    right: "28.1%",
    bottom: "76.58%",
    left: "60.19%",
    position: "absolute",
  },
  vectorIcon20: {
    height: "52.36%",
    width: "16.39%",
    top: "20.29%",
    right: "21.54%",
    bottom: "27.35%",
    left: "62.07%",
    position: "absolute",
  },
  vectorIcon22: {
    opacity: 0.1,
  },
  vectorIcon23: {
    height: "32.74%",
    width: "15.78%",
    top: "67.25%",
    right: "21.7%",
    bottom: "0.02%",
    left: "62.52%",
    position: "absolute",
  },
  vectorIcon24: {
    height: "19.96%",
    top: "0%",
  },
  vectorIcon25: {
    height: "4.63%",
    width: "6.69%",
    right: "46.8%",
    bottom: "38.88%",
    left: "46.51%",
  },
  vectorIcon26: {
    height: "8.57%",
    width: "5.99%",
    top: "89.36%",
    right: "56.31%",
    bottom: "2.07%",
    left: "37.7%",
    opacity: 0.1,
    position: "absolute",
  },
  vectorIcon27: {
    height: "35.5%",
    width: "12.58%",
    top: "32.63%",
    right: "25.34%",
    bottom: "31.88%",
    left: "62.08%",
    opacity: 0.1,
    position: "absolute",
  },
  vectorIcon28: {
    height: "8.39%",
    width: "3.92%",
    top: "36.28%",
    right: "48.65%",
    bottom: "55.32%",
    left: "47.43%",
    position: "absolute",
  },
  vectorIcon29: {
    height: "15.34%",
    width: "12.14%",
    top: "38.68%",
    right: "46.08%",
    bottom: "45.98%",
    left: "41.78%",
    opacity: 0.1,
    position: "absolute",
  },
  vectorIcon30: {
    height: "22.13%",
    width: "12.35%",
    top: "39.23%",
    right: "39.47%",
    bottom: "38.64%",
    left: "48.18%",
    position: "absolute",
  },
  vectorIcon31: {
    height: "35.48%",
    width: "16.5%",
    top: "31.93%",
    right: "25.42%",
    bottom: "32.58%",
    left: "58.07%",
    position: "absolute",
  },
  vectorIcon32: {
    height: "2.01%",
    width: "1.22%",
    top: "36.66%",
    right: "49.81%",
    bottom: "61.32%",
    left: "48.97%",
    position: "absolute",
  },
  vectorIcon33: {
    height: "15.09%",
    width: "11.66%",
    top: "71%",
    right: "63.94%",
    bottom: "13.9%",
    left: "24.41%",
    position: "absolute",
  },
  vectorIcon34: {
    height: "12.62%",
    width: "9.81%",
    top: "72.23%",
    right: "64.85%",
    bottom: "15.15%",
    left: "25.34%",
    position: "absolute",
  },
  vectorIcon35: {
    height: "0.34%",
    width: "0.27%",
    top: "74.93%",
    right: "73.83%",
    bottom: "24.73%",
    left: "25.9%",
    position: "absolute",
  },
  vectorIcon36: {
    height: "0.56%",
    width: "0.45%",
    top: "81.76%",
    right: "65.27%",
    bottom: "17.67%",
    left: "34.29%",
    position: "absolute",
  },
  groupIcon: {
    height: "11.93%",
    top: "8.02%",
    opacity: 0.1,
  },
  salon: {
    height: "27.74%",
    width: "69.18%",
    top: "100%",
    left: "15.72%",
    color: Color.black,
    textAlign: "center",
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    fontSize: FontSize.size_5xl,
    position: "absolute",
  },
  undrawBarber3Uel1: {
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    height: 137,
    left: 0,
    top: 0,
    overflow: "hidden",
  },
  salon1: {
    top: 150,
    left: 19,
    width: 120,
  },
  undrawBarber3Uel1Parent: {
    top: 472,
    left: 24,
    height: 182,
  },
  undrawMaleAvatarG98d1Icon: {
    top: -1,
    left: -1,
    width: 143,
    height: 136,
    position: "absolute",
    overflow: "hidden",
  },
  customer: {
    top: 134,
    left: 7,
    width: 134,
  },
  undrawMaleAvatarG98d1Parent: {
    top: 470,
    left: 228,
    width: 141,
    height: 166,
    position: "absolute",
  },
  rapidSaloonService: {
    top: 264,
    fontSize: 32,
    width: 417,
    height: 17,
    fontFamily: FontFamily.poppinsSemibold,
    fontWeight: "600",
    color: Color.black,
    textAlign: "center",
    left: 11,
    position: "absolute",
  },
  userscreen: {
    backgroundColor: Color.white,
    width: 428,
    height: 926,
  },
});

export default UserScreen;
