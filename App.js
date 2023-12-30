import firebase from "firebase/app";
import "firebase/auth";
import * as React from "react";
import { auth } from "./firebase/firebaseConfig";
//import { initializeApp } from 'firebase/app';
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";

import SplashScreen from "./screens/SplashScreen";
import UserScreen from "./screens/UserScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import SalonRegistrationScreen from "./screens/SalonRegistrationScreen";
import LogInScreen from "./screens/LogInScreen";
import SalonLogInScreen from "./screens/SalonLoginScreen";
import MainScreen from "./screens/MainScreen";
import DashboardSlide from "./screens/DashBoardSlide";
import SalonInbox from "./screens/SalonInbox";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import Maps from "./screens/Maps";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerNavigator from "./screens/DrawerNavigator";
import CustomerInbox from "./screens/CustomerInbox";
//import {stack} from "@react-navigation/stack";

import { useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { getAuth } from "@firebase/auth";
import Bookings from "./screens/Bookings";
import Requests from "./screens/Requests";
import Gallery from "./screens/Gallery";
import Profile from "./screens/SalonProfileScreen";
import Header from "./components/Header";
//import firebase from "./firebaseconfig";
import { useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "@firebase/auth";
import CustomDrawer from "./components/CustomerDrawer";
import WomenServices from "./screens/WomenServices";
import MenServices from "./screens/MenServices";
import UserMessagesScreen from "./screens/userMessagesScreen";

import SalonServices from "./screens/SalonServices";
import UpcommingAppointments from "./screens/UpcommingAppointments";
import { AuthProvider } from "./components/AuthContext";
import BottomTabNavigator from "./screens/bottomTabNavigator";
import ProfileScreen from "./screens/ProfileScreen";
import UserContext from "./components/userContext";
import { UserProvider } from "./components/userContext";
import HairSalons from "./screens/HairSalons";
import { SalonProvider } from "./components/salonContext";
import SalonProfileScreen from "./screens/SalonProfileScreen";
import CustomerUserMessagesScreen from "./screens/CustomerUserMessagesScreen";
import SalonSettingsScreen from "./screens/salonSettingScreen";
import CustomerSettingsScreen from "./screens/customerSettingsScreen";
import SalonDetailScreen from "./screens/SalonDetailScreen";
import FavoriteSalonsScreen from "./screens/FavoriteSalonsScreen";
import DeclinedAppointments from "./screens/CustomerModule/DeclinedAppoinemts";
import RequestedAppointments from "./screens/CustomerModule/RequestedAppointments";
import AcceptedAppointments from "./screens/CustomerModule/AcceptedAppointments";
import UpcomingAppointmentsNavigator from "./screens/UpcommingAppointments";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  const [user, setUser] = useState(null);
  const [Initializing, setInitializing] = useState(true);

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, setUser);
    if (Initializing) setInitializing(false);
    return subscriber; // Unsubscribe on unmount
  }, []);

  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);
  const [fontsLoaded, error] = useFonts({
    Poppins: require("./assets/fonts/Poppins.ttf"),
    Poppins_regular: require("./assets/fonts/Poppins_regular.ttf"),
    Poppins_semibold: require("./assets/fonts/Poppins_semibold.ttf"),
    Poppins_bold: require("./assets/fonts/Poppins_bold.ttf"),
    "IBM Plex Sans KR": require("./assets/fonts/IBM_Plex_Sans_KR.ttf"),
    "IBM Plex Sans KR_regular": require("./assets/fonts/IBM_Plex_Sans_KR_regular.ttf"),
    "IBM Plex Sans KR_semibold": require("./assets/fonts/IBM_Plex_Sans_KR_semibold.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <UserProvider>
        <SalonProvider>
          <NavigationContainer>
            {hideSplashScreen ? (
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen
                  name="SplashScreen"
                  component={SplashScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="UserScreen"
                  component={UserScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="RegistrationScreen"
                  component={RegistrationScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="LogInScreen"
                  component={LogInScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="MainScreen"
                  component={MainScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="SalonRegistrationScreen"
                  component={SalonRegistrationScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="SalonLogInScreen"
                  component={SalonLogInScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="SalonInbox"
                  component={SalonInbox}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="Bookings"
                  component={Bookings}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Requests"
                  component={Requests}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="DrawerNavigator"
                  component={DrawerNavigator}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Gallery"
                  component={Gallery}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="SalonProfileScreen"
                  component={SalonProfileScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="WomenServices"
                  component={WomenServices}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="MenServices"
                  component={MenServices}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="SalonServices"
                  component={SalonServices}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="HairSalons"
                  component={HairSalons}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="UpcommingAppointments"
                  component={UpcommingAppointments}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Maps"
                  component={Maps}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="CustomDrawer"
                  component={CustomDrawer}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  initialRouteName="MainScreen"
                  name="BottomTabNavigator"
                  component={BottomTabNavigator}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="ProfileScreen"
                  component={ProfileScreen}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="CustomerInbox"
                  component={CustomerInbox}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="UserMessagesScreen"
                  component={UserMessagesScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="CustomerUserMessagesScreen"
                  component={CustomerUserMessagesScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="SalonSettingsScreen"
                  component={SalonSettingsScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="CustomerSettingsScreen"
                  component={CustomerSettingsScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="SalonDetailScreen"
                  component={SalonDetailScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="FavoriteSalonsScreen"
                  component={FavoriteSalonsScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="AcceptedAppointments"
                  component={AcceptedAppointments}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="DeclinedAppointments"
                  component={DeclinedAppointments}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="RequestedAppointments"
                  component={RequestedAppointments}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="UpcomingAppointmentsNavigator"
                  component={UpcomingAppointmentsNavigator}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            ) : null}
          </NavigationContainer>
        </SalonProvider>
      </UserProvider>
    </>
  );
};

export default App;
