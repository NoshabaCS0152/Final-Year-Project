// Import required dependencies
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from './MainScreen';
import MenServices from './MenServices';
import WomenServices from './WomenServices';
import { useNavigation, useRoute } from "@react-navigation/native";
import UpcommingAppointments from './UpcommingAppointments';
import Ionicons from "react-native-vector-icons/Ionicons";
import ProfileScreen from './ProfileScreen';
import SalonHome from './HairSalons';
import CustomerInbox from './CustomerInbox';
const Tab = createBottomTabNavigator();

// Create the bottom tabs
const BottomTabNavigator = ({ route }) => {
  //const fullname = route.params ? route.params.fullname : null;
  //console.log("full name in bottom: ", fullname)
  return (
    <Tab.Navigator initialRouteName="MainScreen">
      <Tab.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color="#FF7851" size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Appointment"
        component={UpcommingAppointments} // You need to define this component
        options={{
          tabBarLabel: 'Appointment',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" color="#FF7851" size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="SalonHome"
        component={SalonHome} // You need to define this component
        options={{
          tabBarLabel: 'Hair Salons',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cut-sharp" color="#FF7851" size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="CustomerInbox"
        component={CustomerInbox} // You need to define this component
        options={{
          tabBarLabel: 'Inbox',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="mail-outline" color="#FF7851" size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen} // You need to define this component
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color="#FF7851" size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
