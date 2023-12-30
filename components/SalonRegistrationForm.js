import * as React from "react";
import { View, Image, StyleSheet, Text, Pressable } from "react-native";
import { TextInput as RNPTextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Border, FontSize, FontFamily, Color } from "../GlobalStyles";

const SalonRegistrationForm = ({ onClose }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.salonRegistrationForm}>
      <Image
        style={styles.shapeIcon}
        resizeMode="cover"
        source={require("../assets/shape.png")}
      />
      <RNPTextInput
        style={[styles.input, styles.inputLayout]}
        placeholder="Enter your full Name"
        label="Label"
        mode="outlined"
        placeholderTextColor="rgba(0, 0, 0, 0.81)"
        outlineColor="#dcdedf"
        activeOutlineColor="#7f7f7f"
        theme={{ colors: { text: "rgba(0, 0, 0, 0.81)" } }}
      />
      <RNPTextInput
        style={[styles.input1, styles.inputPosition]}
        placeholder="Enter your full Name"
        label="Label"
        mode="outlined"
        placeholderTextColor="rgba(0, 0, 0, 0.81)"
        outlineColor="#dcdedf"
        activeOutlineColor="#7f7f7f"
        theme={{ colors: { text: "rgba(0, 0, 0, 0.81)" } }}
      />
      <RNPTextInput
        style={[styles.input2, styles.inputPosition]}
        placeholder="Enter your full Name"
        label="Label"
        mode="outlined"
        placeholderTextColor="rgba(0, 0, 0, 0.81)"
        outlineColor="#dcdedf"
        activeOutlineColor="#7f7f7f"
        theme={{ colors: { text: "rgba(0, 0, 0, 0.81)" } }}
      />
      <RNPTextInput
        style={[styles.input3, styles.inputPosition]}
        placeholder="Enter your full Name"
        label="Label"
        mode="outlined"
        placeholderTextColor="rgba(0, 0, 0, 0.81)"
        outlineColor="#dcdedf"
        activeOutlineColor="#7f7f7f"
        theme={{ colors: { text: "rgba(0, 0, 0, 0.81)" } }}
      />
      <RNPTextInput
        style={[styles.input4, styles.inputPosition]}
        placeholder="Enter your full Name"
        label="Label"
        mode="outlined"
        placeholderTextColor="rgba(0, 0, 0, 0.81)"
        outlineColor="#dcdedf"
        activeOutlineColor="#7f7f7f"
        theme={{ colors: { text: "rgba(0, 0, 0, 0.81)" } }}
      />
      <RNPTextInput
        style={[styles.input5, styles.inputPosition]}
        placeholder="Enter your full Name"
        label="Label"
        mode="outlined"
        placeholderTextColor="rgba(0, 0, 0, 0.81)"
        outlineColor="#dcdedf"
        activeOutlineColor="#7f7f7f"
        theme={{ colors: { text: "rgba(0, 0, 0, 0.81)" } }}
      />
      <Text style={[styles.registration, styles.getStartedFlexBox]}>
        REGISTRATION
      </Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("SalonLogIn")}
      >
        <View style={[styles.buttonChild, styles.getStartedPosition]} />
        <Text style={[styles.getStarted, styles.getStartedPosition]}>
          Regester
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  inputLayout: {
    height: 50,
    width: 378,
    borderRadius: Border.br_3xs,
  },
  inputPosition: {
    left: 25,
    position: "absolute",
  },
  getStartedFlexBox: {
    alignItems: "center",
    display: "flex",
  },
  getStartedPosition: {
    left: "0%",
    top: "0%",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  shapeIcon: {
    top: 0,
    left: 0,
    width: 309,
    height: 258,
    position: "absolute",
  },
  input: {
    top: 265,
    left: 20,
    position: "absolute",
  },
  input1: {
    top: 342,
    height: 50,
    width: 378,
    borderRadius: Border.br_3xs,
  },
  input2: {
    top: 504,
    height: 50,
    width: 378,
    borderRadius: Border.br_3xs,
  },
  input3: {
    top: 581,
    height: 50,
    width: 378,
    borderRadius: Border.br_3xs,
  },
  input4: {
    top: 658,
    height: 50,
    width: 378,
    borderRadius: Border.br_3xs,
  },
  input5: {
    top: 735,
    height: 50,
    width: 378,
    borderRadius: Border.br_3xs,
  },
  registration: {
    top: 190,
    fontSize: FontSize.size_xl,
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    color: Color.coral,
    textAlign: "left",
    width: 247,
    height: 48,
    left: 25,
    position: "absolute",
  },
  buttonChild: {
    right: "0%",
    bottom: "0%",
    backgroundColor: Color.coral,
  },
  getStarted: {
    fontSize: FontSize.size_lg,
    lineHeight: 26,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemibold,
    color: Color.white,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  button: {
    top: 832,
    left: 229,
    width: 166,
    height: 53,
    position: "absolute",
  },
  salonRegistrationForm: {
    backgroundColor: Color.white,
    width: 428,
    height: 926,
    overflow: "hidden",
    maxWidth: "100%",
    maxHeight: "100%",
  },
});

export default SalonRegistrationForm;
