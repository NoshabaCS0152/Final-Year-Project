import React, { useState, useCallback } from "react";
import Profile from "./SalonProfileScreen";
import Drawer1 from "../components/Drawer";
import Discount0 from "../components/Discount0";
import Services from "../components/Services";
import Gallery from "../components/Gallery";
import Logout from "../components/Logout";
import AccountSettings from "../components/AccountSettings";
import DiscountedDeals from "../components/DiscountedDeals";
import NoshabasSalon from "../components/NoshabasSalon";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  Modal,
} from "react-native";
import Dashboard from "../components/Dashboard";
import { Color, FontFamily, FontSize } from "../GlobalStyles";

const DashboardSlide = ({ state, navigation }) => {
  const [drawerItemsNormal] = useState([
    <Profile />,
    <Discount0 />,
    <Services />,
    <Gallery />,
    <Logout />,
    <AccountSettings />,
    <DiscountedDeals />,
    <NoshabasSalon />,
  ]);
  const [drawerItemsActive] = useState([
    <Drawer1 />,
    <Discount0 />,
    <Services />,
    <Gallery />,
    <Logout />,
    <AccountSettings />,
    <DiscountedDeals />,
    <NoshabasSalon />,
  ]);
  const [sideBar2DrawerMenuVisible, setSideBar2DrawerMenuVisible] =
    useState(false);
  const stateIndex = !state ? 0 : state.index;

  const openSideBar2DrawerMenu = useCallback(() => {
    setSideBar2DrawerMenuVisible(true);
  }, []);

  const closeSideBar2DrawerMenu = useCallback(() => {
    setSideBar2DrawerMenuVisible(false);
  }, []);

  return (
    <>
      <Pressable style={styles.sideBar2} onPress={openSideBar2DrawerMenu}>
        <View style={[styles.sideBar2Child, styles.servicesPosition]} />
        {stateIndex === 0 ? drawerItemsActive[0] : drawerItemsNormal[0]}
        <Text style={[styles.noshabasSalon, styles.noshabasTypo]}>
          Noshaba’s Salon
        </Text>
        <Image
          style={[styles.salon1Icon, styles.salon1IconPosition]}
          resizeMode="cover"
          source={require("../assets/Salon1.png")}
        />
        {stateIndex === 7 ? drawerItemsActive[7] : drawerItemsNormal[7]}
      </Pressable>

      <Modal
        animationType="fade"
        transparent
        visible={sideBar2DrawerMenuVisible}
      >
        <View style={styles.sideBar2DrawerMenuOverlay}>
          <Pressable
            style={styles.sideBar2DrawerMenuBg}
            onPress={closeSideBar2DrawerMenu}
          />
          <Dashboard onClose={closeSideBar2DrawerMenu} />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  servicesPosition: {
    left: 0,
    position: "absolute",
  },
  profilePosition: {
    left: 2,
    position: "absolute",
  },
  profile1Typo: {
    textAlign: "left",
    color: Color.white,
    fontFamily: FontFamily.poppinsSemibold,
    fontWeight: "600",
    fontSize: FontSize.size_5xl,
    height: 32,
  },
  galleryPosition: {
    left: 1,
    position: "absolute",
  },
  noshabasTypo: {
    color: Color.coral,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    textAlign: "left",
    fontSize: FontSize.size_5xl,
  },
  salon1IconPosition: {
    left: 29,
    position: "absolute",
  },
  sideBar2DrawerMenuOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  sideBar2DrawerMenuBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  sideBar2Child: {
    backgroundColor: Color.white,
    width: 411,
    height: 248,
    top: 0,
  },
  noshabasSalon: {
    top: -30,
    left: -54,
    width: 278,
    height: 56,
    position: "absolute",
  },
  salon1Icon: {
    top: 26,
    width: 195,
    height: 134,
  },
  sideBar2: {
    backgroundColor: Color.coral,
    width: 371,
    height: 926,
    overflow: "hidden",
  },
});

export default DashboardSlide;
