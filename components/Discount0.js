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
import { FontSize, FontFamily, Color } from "../GlobalStyles";

const Discount0 = ({ style }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.05}
      onPress={() => navigation.navigate("Discounts")}
    >
      <Text style={styles.discount}>Discount 0%</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  discount: {
    fontSize: FontSize.size_5xl,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemibold,
    color: Color.white,
    textAlign: "left",
    width: 352,
    height: 32,
  },
});

export default Discount0;
