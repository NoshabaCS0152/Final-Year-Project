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

const AccountSettings = ({ style }) => {
  return (
    <TouchableOpacity activeOpacity={0.05} onPress={() => {}}>
      <Text style={styles.accountSettings1}>Account Settings</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  accountSettings1: {
    fontSize: FontSize.size_5xl,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemibold,
    color: Color.white,
    textAlign: "left",
    width: 242,
    height: 32,
  },
});

export default AccountSettings;
