import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Color, FontFamily, FontSize } from "../GlobalStyles";

const SalonDashBoard = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.dashboard, styles.iconLayout1]}>
      <View style={[styles.dashboardChild, styles.childBg]} />
      <Text style={styles.dashboard1}>Dashboard</Text>
      <TouchableOpacity
        style={[styles.rectangleParent, styles.rectangleShadowBox]}
        activeOpacity={0.1}
        onPress={() => {}}
      >
        <View style={[styles.componentChild, styles.iconLayout]} />
        <Image
          style={[styles.vectorIcon, styles.iconLayout1]}
          resizeMode="cover"
          source={require("../assets/Picture1.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.rectangleGroup, styles.rectangleShadowBox]}
        activeOpacity={0.1}
        onPress={() => {}}
      >
        <View style={[styles.componentChild, styles.iconLayout]} />
        <Image
          style={[styles.vectorIcon, styles.iconLayout1]}
          resizeMode="cover"
          source={require("../assets/Picture1.png")}
        />
      </TouchableOpacity>
      <Text style={[styles.bookings, styles.bookingsTypo]}>Bookings</Text>
      <Text style={[styles.requests, styles.bookingsTypo]}>{'Requests'}</Text>
      <Text style={styles.todaysAppointments}>Today’s Appointments</Text>
      <TouchableOpacity
        style={styles.iconReload}
        activeOpacity={0.1}
        onPress={() => {}}
      >
        <Image
          style={[styles.icon, styles.iconLayout]}
          resizeMode="cover"
          source={require("../assets/reloadIcon.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconMenu}
        activeOpacity={0.1}
        onPress={() => navigation.toggleDrawer()}
      >
        <Image
          style={[styles.icon, styles.iconLayout]}
          resizeMode="cover"
          source={require("../assets/IconMenu.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  iconLayout1: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  childBg: {
    backgroundColor: Color.coral,
    position: "absolute",
  },
  rectangleShadowBox: {
    height: 136,
    width: 158,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    top: 350,
    position: "absolute",
  },
  iconLayout: {
    width: "100%",
    height: "100%",
  },
  bookingsTypo: {
    height: 28,
    width: 151,
    top: 490,
    color: Color.coral,
    //justifyContent: "center",
    //alignItems: "center",
    //display: "flex",
    textAlign: "center",
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    fontSize: FontSize.size_5xl,
    position: "absolute",
  },
  dashboardChild: {
    top: 0,
    left: 0,
    height: 102,
    width: 428,
  },
  dashboard1: {
    top: 34,
    left: 100,
    color: Color.white,
    width: 196,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    fontSize: FontSize.size_5xl,
    position: "absolute",
  },
  componentChild: {
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    backgroundColor: Color.coral,
    position: "absolute",
  },
  vectorIcon: {
    height: "81.56%",
    width: "61.52%",
    top: "9.56%",
    right: "19.49%",
    bottom: "8.88%",
    left: "18.99%",
    position: "absolute",
  },
  rectangleParent: {
    left: 20,
  },
  rectangleGroup: {
    left: 210,
  },
  bookings: {
    left: 26,
  },
  requests: {
    left: 215,
  },
  todaysAppointments: {
    top: 114,
    left: 20,
    width: 294,
    height: 36,
    color: Color.coral,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    fontSize: FontSize.size_5xl,
    position: "absolute",
  },
  icon: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  iconReload: {
    left: "76.92%",
    top: "15.31%",
    right: "5.14%",
    bottom: "83.8%",
    width: "7.94%",
    height: "3.89%",
    position: "absolute",
  },
  iconMenu: {
    left: "4.67%",
    top: "5.97%",
    right: "83.18%",
    bottom: "92.44%",
    width: "12.15%",
    height: "2.59%",
    position: "absolute",
  },
  dashboard: {
    backgroundColor: Color.white,
    height: 926,
    width: 428,
  },
});

export default SalonDashBoard;
