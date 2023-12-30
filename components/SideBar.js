import React, { useState, useCallback } from "react";
import { View, StyleSheet, Pressable, Image, Text, Modal } from "react-native";
import MainScreen from "./MainScreen";
import { Color, FontFamily, FontSize } from "../GlobalStyles";

const SideBar = ({ onClose }) => {
  const [rectangleVisible, setRectangleVisible] = useState(false);

  const openRectangle = useCallback(() => {
    setRectangleVisible(true);
  }, []);

  const closeRectangle = useCallback(() => {
    setRectangleVisible(false);
  }, []);

  return (
    <>
      <View style={styles.sideBar}>
        <Pressable style={styles.sideBarChild} onPress={openRectangle} />
        <Image
          style={styles.sideBarItem}
          resizeMode="cover"
          source={require("../assets/ellipse-11.png")}
        />
        <Text style={styles.komalShaikh}>Komal Shaikh</Text>
        <Image
          style={[styles.iconHeart, styles.iconPosition]}
          resizeMode="cover"
          source={require("../assets/-icon-heart.png")}
        />
        <Image
          style={[styles.iconPerson, styles.iconPosition]}
          resizeMode="cover"
          source={require("../assets/-icon-person.png")}
        />
        <Text style={[styles.profile, styles.profileTypo]}>Profile</Text>
        <Text style={[styles.favourites, styles.profileTypo]}>Favourites</Text>
        <Text style={[styles.favourites, styles.profileTypo]}>Favourites</Text>
        <Image
          style={[styles.iconMapMarker, styles.iconLayout]}
          resizeMode="cover"
          source={require("../assets/-icon-map-marker.png")}
        />
        <Text style={[styles.address, styles.profileTypo]}>Address</Text>
        <Image
          style={[styles.iconCart, styles.iconLayout]}
          resizeMode="cover"
          source={require("../assets/-icon-cart.png")}
        />
        <Text style={[styles.cart, styles.cartTypo]}>Cart</Text>
        <Image
          style={styles.image9Icon}
          resizeMode="cover"
          source={require("../assets/image-9.png")}
        />
        <Text style={[styles.vouchersAndOffers, styles.cartTypo]}>
          Vouchers and offers
        </Text>
        <Image
          style={[styles.iconCalendar, styles.iconLayout]}
          resizeMode="cover"
          source={require("../assets/-icon-calendar.png")}
        />
        <Text
          style={[styles.appointments, styles.cartTypo]}
        >{`Appointments `}</Text>
      </View>

      <Modal animationType="fade" transparent visible={rectangleVisible}>
        <View style={styles.rectangleOverlay}>
          <Pressable style={styles.rectangleBg} onPress={closeRectangle} />
          <MainScreen onClose={closeRectangle} />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  iconPosition: {
    left: "4.76%",
    position: "absolute",
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  profileTypo: {
    height: 48,
    color: Color.black,
    fontFamily: FontFamily.poppinsSemibold,
    fontWeight: "600",
    left: 104,
    textAlign: "left",
    fontSize: FontSize.size_5xl,
    position: "absolute",
  },
  iconLayout: {
    height: "6.8%",
    position: "absolute",
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  cartTypo: {
    left: 114,
    height: 48,
    color: Color.black,
    fontFamily: FontFamily.poppinsSemibold,
    fontWeight: "600",
    textAlign: "left",
    fontSize: FontSize.size_5xl,
    position: "absolute",
  },
  rectangleOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  rectangleBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  sideBarChild: {
    top: 0,
    left: 0,
    backgroundColor: Color.coral,
    height: 249,
    position: "absolute",
    width: 378,
  },
  sideBarItem: {
    top: 20,
    height: 125,
    width: 125,
    left: 18,
    position: "absolute",
  },
  komalShaikh: {
    top: 196,
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    color: Color.white,
    width: 191,
    height: 33,
    textAlign: "left",
    fontSize: FontSize.size_5xl,
    left: 18,
    position: "absolute",
  },
  iconHeart: {
    height: "7.13%",
    top: "46.44%",
    right: "78.84%",
    bottom: "46.44%",
    width: "16.4%",
  },
  iconPerson: {
    height: "9.08%",
    width: "16.67%",
    top: "32.29%",
    bottom: "58.63%",
    right: "78.57%",
  },
  profile: {
    top: 335,
    width: 125,
  },
  favourites: {
    top: 448,
    width: 169,
  },
  iconMapMarker: {
    top: "57.88%",
    bottom: "35.31%",
    left: "5.03%",
    right: "78.57%",
    width: "16.4%",
  },
  address: {
    top: 544,
    width: 169,
  },
  iconCart: {
    width: "22.21%",
    top: "69.01%",
    right: "75.94%",
    bottom: "24.19%",
    left: "1.85%",
  },
  cart: {
    top: 654,
    width: 169,
  },
  image9Icon: {
    top: 725,
    left: 31,
    width: 78,
    height: 63,
    position: "absolute",
  },
  vouchersAndOffers: {
    top: 750,
    width: 264,
  },
  iconCalendar: {
    width: "13.66%",
    top: "89.42%",
    right: "78.14%",
    bottom: "3.78%",
    left: "8.2%",
  },
  appointments: {
    top: 843,
    width: 231,
  },
  sideBar: {
    backgroundColor: Color.white,
    height: 926,
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    width: 378,
  },
});

export default SideBar;
