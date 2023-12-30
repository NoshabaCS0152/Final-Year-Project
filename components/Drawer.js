import * as React from "react";
import {
  Pressable,
  StyleProp,
  ViewStyle,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";

const Drawer1 = ({ style }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={[styles.drawer, style]}
      onPress={() => navigation.navigate("false")}
    >
      {stateIndex === 0 ? drawerItemsActive[0] : drawerItemsNormal[0]}
      {stateIndex === 1 ? drawerItemsActive[1] : drawerItemsNormal[1]}
      {stateIndex === 2 ? drawerItemsActive[2] : drawerItemsNormal[2]}
      {stateIndex === 3 ? drawerItemsActive[3] : drawerItemsNormal[3]}
      {stateIndex === 4 ? drawerItemsActive[4] : drawerItemsNormal[4]}
      {stateIndex === 5 ? drawerItemsActive[5] : drawerItemsNormal[5]}
      {stateIndex === 6 ? drawerItemsActive[6] : drawerItemsNormal[6]}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  profilePosition: {
    left: 2,
    position: "absolute",
  },
  profile1Typo: {
    height: 32,
    textAlign: "left",
    color: Color.white,
    fontFamily: FontFamily.poppinsSemibold,
    fontWeight: "600",
    fontSize: FontSize.size_5xl,
  },
  servicesPosition: {
    left: 0,
    position: "absolute",
  },
  galleryPosition: {
    left: 1,
    position: "absolute",
  },
  drawer: {
    width: 354,
    height: 384,
  },
});

export default Drawer1;
