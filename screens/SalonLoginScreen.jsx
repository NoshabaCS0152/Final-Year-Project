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
import { useContext, useState, useEffect } from "react";
import { FontFamily, FontSize, Border, Color } from "../GlobalStyles";
import { auth, useAuth } from "@react-native-firebase/auth";
import SalonRegistrationScreen from "./SalonRegistrationScreen";
import SalonDashboard from "./SalonInbox";
import { signInWithEmailAndPassword, getAuth, onAuthStateChanged } from "@firebase/auth";
import { useRoute } from "@react-navigation/native"
import { getDatabase, ref, onValue, child, get } from "firebase/database";
import CustomDrawer from "../components/CustomerDrawer";
import DrawerNavigator from "./DrawerNavigator";
import { useSalon } from "../components/salonContext";
import SalonProfileScreen from "./SalonProfileScreen";


const SalonLogInScreen = () => {

  const Navigation = useNavigation();


  const [email, setEmail] = useState(" ")
  const [password, setPassword] = useState(" ")
  const [businessName, setbusinessName] = useState(" ")

  const { setSalonName, setSalon } = useSalon();

  /*
    useEffect(() => {
  
      onAuthStateChanged(auth, (user) => {
        if (user) {
          Navigation.replace("DrawerNavigator");
          const uid = user.uid;
          // ...
        } 
      });
      
  
    }, [email, password])*/

  const UpdateSecurityTextEntry = () => {
    setPassword({
      ...password,
      secureTextEntry: !password.secureTextEntry
    })
  }
  //var Name = " ";
  var userId = 1;


  const handleLogin = async () => {


    const db = getDatabase();
    const dbRef = ref(getDatabase());
    var newName = " ";

    const auth = getAuth();
    if (!email || !password) {
      Alert.alert('Please fill in all fields')
      return
    }
    try {
      const isUserLogin = await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setSalon(user)
          //console.log("user data", user)
          //Alert.alert('user Login successfully')
          //Navigation.navigate("DrawerNavigator");

          get(child(dbRef, "salons/" + user.uid)).then((snapshot) => {

            if (snapshot.exists()) {
              console.log(snapshot.val().email)

              const businessName = snapshot.val().businessName;
              setSalonName(businessName);
              console.log("business name is : " + businessName);
              Alert.alert('User LogIn Successfully')
              // newName = businessName;
              console.log("new Name: ", newName)
              //const businessName = snapshot.val().businessName;
              console.log("businessName new name again:", businessName);

              // Set user data in the context

              Navigation.navigate("DrawerNavigator", { screen: 'SalonProfileScreen', params: { businessName: businessName } });
              //Navigation.navigate("DrawerNavigator", {screen: 'Profile',{params: businessName }});


            } else {
              console.log("No data available");
              Alert.alert("the email is not in Database");
            }
          }).catch((error) => {
            console.error(error);
          });


        })
    }
    catch (error) {
      const erroCode = error.code;
      const errorMessage = error.message;
      console.log("erroCode == ", erroCode)
      console.log("Error Message == ", errorMessage)
      Alert.alert('email/password not found')
    }
  }



  return (
    <ScrollView>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}>
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
            <TouchableOpacity onPress={() => Navigation.navigate(SalonRegistrationScreen)} >
              <Text style={[styles.signUp, styles.signUpTypo]}>Sign up</Text>
            </TouchableOpacity>
          </Text>

          <View style={[styles.input, styles.inputLayout]}>

            <Ionicons name="mail-outline" size={20} color="#949096" style={{ marginTop: 18, left: 10 }} />
            <RNPTextInput
              style={[styles.textInput]}
              placeholder="Enter your Email"
              onChangeText={(email) => setEmail(email)}
              //onBlur={() => this.emailValidator()}
              label="Email"
              //mode="outlined"
              keyboardType="email-address"
              placeholderTextColor="rgba(0, 0, 0, 0.81)"
            //outlineColor="#dcdedf"
            //activeOutlineColor="#7f7f7f"
            // theme={{ colors: { text: "rgba(0, 0, 0, 0.81)" } }}
            />

          </View>
          <View style={[styles.input1, styles.inputLayout]}>

            <Ionicons name="lock-closed" size={25} color="#949096" style={{ marginTop: 18, left: 10 }} />
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
                <Ionicons name="eye-outline" size={20} style={{ marginTop: 15 }}></Ionicons>
                :
                <Ionicons name="eye-off-outline" size={20} style={{ marginTop: 15 }}></Ionicons>
              }
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
            <Text style={[styles.getStarted, styles.getStartedTypo]}>Log In</Text>
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
    color: Color.black


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
    borderColor: '#949096',
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



export default SalonLogInScreen;
