import React, { Children, createContext } from "react";
import { useContext, useState } from "react";
//import { AuthContext } from "../navigation/Authentication";
//import { TextInput as RNPTextInput, Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
//import { Input } from "react-native-elements";
//import auth from "@react-native-firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import {
  TouchableOpacity, KeyboardAvoidingView,
  ScrollView, TextInput as RNPTextInput, Alert
} from 'react-native';
//import auth from "@react-native-firebase/auth";
import {
  Image,
  StyleSheet,
  StatusBar,
  Pressable,
  View,
  Text,
} from "react-native";
import LogInScreen from "./LogInScreen";
import { getAuth } from "@firebase/auth";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { getDatabase, ref, onValue, set } from "firebase/database";
//import { firebase } from "@react-native-firebase/auth";



const RegistrationScreen = () => {

  //const [email, setEmail] = useState('')
  //const [password, setPassword] = useState('')
  //const [fullname, setFullname] = useState('')

  const [email, setEmail] = useState(" ")
  const [password, setPassword] = useState(" ")
  const [fullname, setFullname] = useState(" ")
  const [error, setError] = useState(" ")

  const [userId, setUserId] = useState(1);


  const UpdateSecurityTextEntry = () => {
    setPassword({
      ...password,
      secureTextEntry: !password.secureTextEntry
    })
  }

  // var userId = 1;

  const handleRegistration = async () => {
    const auth = getAuth();
    const database = getDatabase();

    try {
      if (!fullname || !email || !password) {
        Alert.alert('Please fill in all fields');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const newUserRef = ref(database, 'users/' + user.uid); // Use user.uid as the key

      set(newUserRef, {
        fullname,
        email,
        password,
      });

      Alert.alert('The User is successfully Registered');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('errorCode == ', errorCode);
      console.log('Error Message == ', errorMessage);
    }
  };
  const Navigation = useNavigation();
  { error ? <Text style={styles.errorMessage}>{error}</Text> : null }

  return (
    <ScrollView>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}>


        <View style={styles.registrationScreen}>
          <Image
            style={styles.CornerShapeIcon}
            resizeMode="contain"
            source={require("../assets/CornerShape.png")}
          />
          <StatusBar style={styles.buttonLayout} barStyle="default" />

          <Text
            style={[
              styles.welcomeOnboard,
              styles.getStartedFlexBox,
              styles.getStartedTypo,
            ]}
          >
            Welcome Onboard
          </Text>
          <Text
            style={[
              styles.letHopeYou,
              styles.letHopeYouClr,
              styles.getStartedFlexBox,
            ]}
          >
            let hope you get your service Rapidly
          </Text>


          <View style={[styles.input, styles.inputLayout]}>
            <Ionicons name="person" size={20} color="#949096" style={{ marginTop: 18, left: 10 }} />
            <RNPTextInput
              style={[styles.textInput]}
              placeholder="Enter your full Name"
              label="Full Name"
              onChangeText={(fullname) => setFullname(fullname)}
              //mode="outlined"
              placeholderTextColor="rgba(0, 0, 0, 0.81)"
            //placeholderTextColor="rgba(0, 0, 0, 0.81)"
            //outlineColor="#dcdedf"
            // activeOutlineColor="#7f7f7f"
            //theme={{ colors: { text: "rgba(0, 0, 0, 0.81)" } }}
            />
          </View>


          <View style={[styles.input1, styles.inputLayout]}>

            <Ionicons name="mail-outline" size={20} color="#949096" style={{ marginTop: 18, left: 10 }} />
            <RNPTextInput
              style={[styles.textInput]}
              placeholder="Enter your Email"
              onChangeText={(email) => setEmail(email)}
              placeholderTextColor="rgba(0, 0, 0, 0.81)"
              //onBlur={() => this.emailValidator()}
              label="Email"
              //mode="outlined"
              keyboardType="email-address"
            //placeholderTextColor="rgba(0, 0, 0, 0.81)"
            //outlineColor="#dcdedf"
            //activeOutlineColor="#7f7f7f"
            // theme={{ colors: { text: "rgba(0, 0, 0, 0.81)" } }}
            />

          </View>


          <View style={[styles.input2, styles.inputLayout]}>

            <Ionicons name="lock-closed" size={20} color="#949096" style={{ marginTop: 18, left: 10 }} />
            <RNPTextInput
              style={[styles.textInput]}
              placeholder="Enter Password"
              onChangeText={(password) => setPassword(password)}
              label="Password"
              secureTextEntry={password.secureTextEntry ? false : true}
              placeholderTextColor="rgba(0, 0, 0, 0.81)"
            />
            <TouchableOpacity
              onPress={UpdateSecurityTextEntry}>
              {password.secureTextEntry ?
                <Ionicons name="eye-outline" size={25} color="#949096" style={{ marginTop: 15 }}></Ionicons>
                :
                <Ionicons name="eye-off-outline" size={25} color="#949096" style={{ marginTop: 15 }}></Ionicons>
              }
            </TouchableOpacity>

          </View>



          <View style={[styles.input3, styles.inputLayout]}>

            <Ionicons name="lock-closed" size={20} color="#949096" style={{ marginTop: 18, left: 10 }} />
            <RNPTextInput
              style={[styles.textInput]}
              placeholder="Confirm Password"
              // onChangeText={(password) = setPassword(password)}
              label="Confirm Password"
              secureTextEntry={password.secureTextEntry ? false : true}

              placeholderTextColor="rgba(0, 0, 0, 0.81)"

            //theme={{ colors: { text: "rgba(0, 0, 0, 0.81)" } }}
            />
            <TouchableOpacity
              onPress={UpdateSecurityTextEntry}>
              {password.secureTextEntry ?
                <Ionicons name="eye-outline" size={25} color="#949096" style={{ marginTop: 15 }}></Ionicons>
                :
                <Ionicons name="eye-off-outline" size={25} color="#949096" style={{ marginTop: 15 }}></Ionicons>
              }
            </TouchableOpacity>

          </View>
          {error ? <Text style={{ color: 'red', top: 150, left: 130 }}>{error}</Text> : null}


          <TouchableOpacity
            style={[styles.button, styles.buttonLayout]}
            onPress={() => handleRegistration()}
          >
            <View style={[styles.buttonChild, styles.signUpButtonPosition]} />
            <Text
              style={[
                styles.SignUpText,
                styles.getStartedFlexBox,
                styles.getStartedTypo,
                styles.signUpButtonPosition,
              ]}
            >
              Sign Up
            </Text>
          </TouchableOpacity>




          <Text style={styles.alreadyHaveAnContainer}>
            <Text style={styles.letHopeYouClr}>{`Already have an account ?`}</Text>
            <TouchableOpacity onPress={() => Navigation.navigate(LogInScreen)} >
              <Text style={styles.signIn}>  Sign In</Text>
            </TouchableOpacity>
          </Text>


        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  IconStyle: {
    top: 45,
    left: -20
  },
  Text_footer: {
    fontSize: 18
  },
  textInput: {
    //marginTop: 100, 
    //padding: 15,
    paddingLeft: 20,
    //paddingBottom: 20,
    flex: 5,
    color: Color.black,


  },

  buttonLayout: {
    width: 310,
    position: "absolute",
    left: 20,


  },
  signUpButtonPosition: {
    left: "0%",
    top: "0%",
    height: "100%",
    width: "100%",
  },
  getStartedFlexBox: {
    textAlign: "center",
    position: "absolute",
    marginTop: 15,
  },
  getStartedTypo: {
    fontFamily: FontFamily.poppinsSemibold,
    fontWeight: "600",
    fontSize: FontSize.size_xl,
    textAlign: "center",
  },
  letHopeYouClr: {
    color: Color.black,
    fontFamily: FontFamily.poppinsRegular,
  },
  inputLayout: {


    // justifyContent: 'space-around',  
    height: 60,
    width: 320,
    opacity: 10,
    borderWidth: 1,
    borderColor: '#949096',
    borderRadius: Border.br_md,
    left: 15,
    //position: "absolute",
    flexDirection: 'row'

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
    position: "absolute",
  },
  SignUpText: {
    color: Color.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 26,
  },
  button: {
    top: 570,
    left: 25,
    height: 61,
  },
  welcomeOnboard: {
    top: 160,
    left: 70,
    color: Color.black,
    width: 229,
  },
  letHopeYou: {
    top: 200,
    left: 50,
    fontSize: FontSize.size_base,
    width: 281,
    lineHeight: 26,
  },
  signIn: {
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    color: Color.firebrick,
  },
  alreadyHaveAnContainer: {
    top: 650,
    left: 70,
    fontSize: FontSize.size_lg,
    textAlign: "left",
    lineHeight: 26,
    position: "absolute",
  },
  input: {
    top: 255,
    // width: 20,

  },
  input1: {
    top: 273,

  },
  input2: {
    top: 291,
  },
  input3: {
    top: 310,

  },
  registrationScreen: {
    backgroundColor: Color.white,
    flex: 1,
    height: 926,
    overflow: "hidden",
    width: "100%",
  },
});

export default RegistrationScreen;
