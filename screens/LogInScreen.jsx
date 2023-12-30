import * as React from "react";
import {
  Image,
  StyleSheet,
  StatusBar,
  Pressable,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  TextInput as RNPTextInput,
  Alert,
} from "react-native";
//import { TextInput as RNPTextInput } from "react-native-paper";
//import database from '@react-native-firebase/database';
//import { AuthContext } from "../navigation/Authentication";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useFocusEffect } from '@react-navigation/native';
import { useContext, useState } from "react";
import { FontFamily, FontSize, Border, Color } from "../GlobalStyles";
import auth from "@react-native-firebase/auth";
//import { Toast } from "react-native-toast-message";
import RegistrationScreen from "./RegistrationScreen";
import { getAuth } from "@firebase/auth";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { useRoute } from "@react-navigation/native";
import { getDatabase, ref, onValue, child, get, push } from "firebase/database";
import BottomTabNavigator from "./bottomTabNavigator";
import MainScreen from "./MainScreen";
import { useUser } from "../components/userContext";

const LogInScreen = () => {
  const Navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setFullname, setcustomerID } = useUser();


  const auth = getAuth();
  const UpdateSecurityTextEntry = () => {
    setPassword({
      ...password,
      secureTextEntry: !password.secureTextEntry
    })
  }


  const handleLogin = async () => {
    const db = getDatabase();
    const auth = getAuth();
    let customerID = " "

    if (!email || !password) {
      Alert.alert("Please fill in all fields");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("User UID:", user.uid); // Debugging output
      customerID = user.uid
      setcustomerID(customerID)
      console.log("customerID:", customerID);
      console.log("user with email:", email, " exists in the database");

      const dbRef = ref(db, "users/" + user.uid + "/fullname"); // Update the reference path
      console.log("Database Reference Path:", dbRef.toString());
      const snapshot = await get(dbRef);
      //const snapshot = await get(dbRef);
      console.log("Snapshot:", snapshot); // Debugging output

      if (snapshot.exists()) {

        const fullname = snapshot.val(); // Just get the value directly
        console.log("Full name login screen is:", fullname);

        setFullname(fullname);
        Alert.alert("User Logged In Successfully");

        Navigation.navigate("BottomTabNavigator");
      } else {
        console.log("No data available");
        Alert.alert("The email is not in the Database");
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("errorCode == ", errorCode);
      console.log("Error Message == ", errorMessage);
      Alert.alert("Email/Password not found");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setEmail('');
      setPassword('');

      return () => {
        // Cleanup logic if needed
      };
    }, [])
  );

  return (
    <ScrollView>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View style={styles.logInScreen}>
          <Image
            style={styles.CornerShapeIcon}
            resizeMode="contain"
            source={require("../assets/CornerShape.png")}
          />
          <StatusBar style={styles.buttonLayout} barStyle="default" />

          <Text style={[styles.welcomeBack, styles.getStartedTypo]}>
            Welcome Back !
          </Text>
          <Text style={[styles.dontHaveAnContainer, styles.forgotPasswordTypo]}>
            <Text style={styles.dontHaveAn}>{`Don’t have an account ? `}</Text>
            <TouchableOpacity
              onPress={() => Navigation.navigate(RegistrationScreen)}
            >
              <Text style={[styles.signUp, styles.signUpTypo]}>Sign up</Text>
            </TouchableOpacity>
          </Text>

          <View style={[styles.input, styles.inputLayout]}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="#949096"
              style={{ marginTop: 18, left: 10 }}
            />
            <RNPTextInput
              style={[styles.textInput]}
              placeholder="Enter your Email"
              onChangeText={(email) => setEmail(email)}
              label="Email"
              //mode="outlined"
              keyboardType="email-address"
              placeholderTextColor="rgba(0, 0, 0, 0.81)"
              outlineColor="#dcdedf"
            />
          </View>
          <View style={[styles.input1, styles.inputLayout]}>
            <Ionicons
              name="lock-closed"
              size={20}
              color="#949096"
              style={{ marginTop: 18, left: 10 }}
            />
            <RNPTextInput
              style={[styles.textInput]}
              placeholder="Enter Password"
              onChangeText={(password) => setPassword(password)}
              label="Password"
              secureTextEntry={password.secureTextEntry ? false : true}
              placeholderTextColor="rgba(0, 0, 0, 0.81)"
            />
            <TouchableOpacity onPress={UpdateSecurityTextEntry}>
              {password.secureTextEntry ? (
                <Ionicons
                  name="eye-outline"
                  size={20}
                  color="#949096"
                  style={{ marginTop: 15 }}
                ></Ionicons>
              ) : (
                <Ionicons
                  name="eye-off-outline"
                  size={20}
                  color="#949096"
                  style={{ marginTop: 15 }}
                ></Ionicons>
              )}
            </TouchableOpacity>
          </View>

          <Image
            style={styles.frameIcon}
            resizeMode="cover"
            source={require("../assets/frame.png")}
          />

          <TouchableOpacity
            style={[styles.button, styles.buttonLayout]}
            activeOpacity={0.2}
            onPress={() => handleLogin()}
          >
            <View style={styles.buttonChild} />
            <Text style={[styles.getStarted, styles.getStartedTypo]}>
              Log In
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonLayout: {
    width: 310,
    position: "absolute",
  },
  textInput: {
    //marginTop: 100,
    //padding: 15,
    paddingLeft: 20,
    //paddingBottom: 20,
    flex: 5,
    color: Color.black,
  },
  getStartedTypo: {
    textAlign: "center",
    fontFamily: FontFamily.poppinsSemibold,
    fontWeight: "600",
    position: "absolute",
    marginTop: 15,
  },
  forgotPasswordTypo: {
    textAlign: "left",
    fontSize: FontSize.size_lg,
    lineHeight: 26,
    position: "absolute",
  },
  signUpTypo: {
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
  },
  inputLayout: {
    height: 60,
    width: 310,
    borderRadius: Border.br_md,
    left: 28,
    borderWidth: 1,
    borderColor: "#949096",
    //position: "absolute",
    flexDirection: "row",
  },
  CornerShapeIcon: {
    top: -12,
    left: 0,
    width: 230,
    height: 180,
    position: "absolute",
  },
  buttonChild: {
    right: "0%",
    bottom: "0%",
    backgroundColor: Color.coral,
    left: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  getStarted: {
    fontSize: FontSize.size_xl,
    color: Color.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 26,
    textAlign: "center",
    fontFamily: FontFamily.poppinsSemibold,
    fontWeight: "600",
    left: "0%",
    top: "0%",
    height: "100%",
    width: "100%",
  },
  button: {
    top: 595,
    left: 27,
    height: 61,
    borderRadius: 5,
  },
  welcomeBack: {
    top: 120,
    left: 80,
    fontSize: 18,
    color: Color.black,
    width: 229,
  },
  dontHaveAn: {
    fontFamily: FontFamily.poppinsRegular,
    color: Color.black,
  },
  signUp: {
    color: Color.firebrick,
  },
  dontHaveAnContainer: {
    top: 674,
    left: 74,
  },
  forgotPassword: {
    top: 537,
    left: 120,
    color: Color.coral,
  },
  input: {
    top: 390,
  },
  input1: {
    top: 410,
  },
  frameIcon: {
    top: 175,
    left: 115,
    width: 203,
    height: 174,
    position: "absolute",
    overflow: "hidden",
  },
  logInScreen: {
    backgroundColor: Color.white,
    flex: 1,
    height: 926,
    overflow: "hidden",
    width: "100%",
  },
});

export default LogInScreen;
