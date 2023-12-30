import * as React from "react";
import { StyleProp, ViewStyle, Text, StyleSheet } from "react-native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

const NoshabasSalon = ({ style }) => {
  return <Text style={[styles.noshabasSalon, style]}>Noshaba’s Salon</Text>;
};

const styles = StyleSheet.create({
  noshabasSalon: {
    fontSize: FontSize.size_5xl,
    fontWeight: "500",
    fontFamily: FontFamily.poppinsMedium,
    color: Color.coral,
    textAlign: "left",
    width: 234,
    height: 32,
  },
});

export default NoshabasSalon;
