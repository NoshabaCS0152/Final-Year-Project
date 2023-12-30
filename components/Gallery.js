import * as React from "react";
import {
  Pressable,
  StyleProp,
  ViewStyle,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

const Gallery = ({ style }) => {
  return (
    <TouchableOpacity activeOpacity={0.05} onPress={() => {}}>
      <Text style={styles.gallery1}>Gallery</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gallery1: {
    fontSize: FontSize.size_5xl,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemibold,
    color: Color.white,
    textAlign: "left",
    width: 104,
    height: 32,
  },
});

export default Gallery;
