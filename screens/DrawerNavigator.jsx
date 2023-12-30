import 'react-native-gesture-handler';
import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
//import Bookings from "./Requests";
//import Requests from './Bookings';
//import Requests from "./Requests";
import SalonInbox from './SalonInbox';
import Gallery from './Gallery';
import CustomDrawer from '../components/CustomerDrawer';
import Profile from './SalonProfileScreen';
import { useRoute } from '@react-navigation/native';
import { color } from 'react-native-reanimated';
import SalonProfileScreen from './SalonProfileScreen';
import SalonSettingsScreen from './salonSettingScreen';
import AddSalonLocation from './AddSalonLocation';
import Requests from './Requests';
import Bookings from './Bookings';

const DrawerNavigator = ({ newName }) => {
  const navigation = useNavigation();

  const Drawer = createDrawerNavigator();
  const route = useRoute();

  newName = route.params?.newName;
  console.log("this is newName: ", newName)



  return (

    <>

      <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} screenOptions={{

        //drawerActiveBackgroundColor: "red",
        //drawerInactiveBackgroundColor: "red",
        //drawerInactiveTintColor: "red",
        // headerShown: false,
        headerTintColor: Color.white,

        headerStyle: {
          backgroundColor: '#FF7851',
          height: 90,

        },
        drawerIcon: {
          size: 40,
        },
        headerTitleStyle: {
          //left: 20,
          color: Color.white,
          //fontWeight:50,
          fontSize: 30,
        },
        drawerStyle: {
          //marginLeft: 15,
          backgroundColor: "#FADFDF",
          width: 240,
          color: Color.white,
          FontFamily: 'Roboto-Medium',
          FontSize: 15,
        },

      }}

      >
        <Drawer.Screen name="profile" component={SalonProfileScreen} options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person" size={20} color={color} />
          )
        }} />
        <Drawer.Screen name="Inbox" component={SalonInbox}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="md-chatbox-outline" size={20} color={color} />
            )
          }} />

        <Drawer.Screen name="Requests" component={Requests} options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="briefcase-outline" size={20} color={color} />
          )
        }} />
        <Drawer.Screen name="Bookings" component={Bookings} options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="briefcase-outline" size={20} color={color} />
          )
        }} />

        <Drawer.Screen name="Settings" component={SalonSettingsScreen}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="settings-outline" size={20} color={color} />
            )
          }} />

        <Drawer.Screen name="Add Location" component={AddSalonLocation}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="location-outline" size={20} color={color} />
            )
          }} />
        {/* <Drawer.Screen name="Requests" component={Requests} options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person" size={20} color={color} />
          )
        }} /> */}


      </Drawer.Navigator>



    </>

  );
};

const styles = StyleSheet.create({

  childBg: {
    backgroundColor: Color.coral,
    position: "absolute",
  },

  dashboardChild: {
    top: 0,
    left: 0,
    height: 102,
    width: 428,
  },

  dashboard1: {
    top: 34,
    left: 100,
    color: Color.white,
    width: 196,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    fontSize: FontSize.size_5xl,
    position: "absolute",
  },

  dashboard: {
    backgroundColor: Color.white,
    height: 926,
    width: 428,
  },
});


export default DrawerNavigator;