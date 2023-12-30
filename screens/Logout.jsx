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

const Logout = ({ style }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.05}
      onPress={() => navigation.navigate("Logout")}
    >
      <Text style={styles.logout1}>Logout</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logout1: {
    fontSize: FontSize.size_5xl,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemibold,
    color: Color.white,
    textAlign: "left",
    width: 104,
    height: 32,
  },
});

export default Logout;
