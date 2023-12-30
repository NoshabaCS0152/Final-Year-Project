// UpcomingAppointmentsNavigator.js
import React, { useMemo } from 'react';
import { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AcceptedAppointments from './CustomerModule/AcceptedAppointments';
import DeclinedAppointments from './CustomerModule/DeclinedAppoinemts';
import RequestedAppointments from './CustomerModule/RequestedAppointments';
import { getDatabase, ref as databaseRef, get, onValue, off } from 'firebase/database';
import { useUser } from "../components/userContext";
import { acc } from 'react-native-reanimated';
import AppointmentsContext from './CustomerModule/AppointmentsContext';



const Tab = createMaterialTopTabNavigator();

const UpcomingAppointmentsNavigator = () => {
  // Filter the appointments based on their status useEffect(() => {

  const { customerID } = useUser();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  const fetchAppointments = useCallback(() => {
    const database = getDatabase();
    const orderDetailsRef = databaseRef(database, 'orderDetails');

    const handleDataChange = snapshot => {
      if (snapshot.exists()) {
        const allOrderDetails = Object.values(snapshot.val());
        // Filtering only the appointments related to the current customer
        console.log("this is all order details", allOrderDetails)
        const customerAppointments = allOrderDetails.map(appointment => ({
          ...appointment,
          uuid: generateUUID()

        })).filter(order => order.customerID === customerID);
        setAppointments(customerAppointments);
        setLoading(false);
      }
    };

    onValue(orderDetailsRef, handleDataChange, error => {
      console.error(error);
      setError("Error fetching appointments.");
      setLoading(false);
    });

    return () => off(orderDetailsRef, 'value', handleDataChange);
  }, [customerID]);

  useEffect(() => {
    const detachListener = fetchAppointments();
    return detachListener;
  }, [fetchAppointments]);


  // Filter the appointments based on their status
  const accepted = appointments.filter(app => app.status === 'Accepted');
  console.log("this is accepted data", accepted)
  const declined = appointments.filter(app => app.status === 'Declined');  // Assuming 'Declined' is the correct status, adjust if needed.
  console.log("Declined Appointments:", declined);
  const requests = appointments.filter(app => app.status === 'Appointment requested');
  console.log(",this is data of requests", requests)

  console.log("All Appointments:", appointments);



  if (loading) {
    return <Text>Loading...</Text>
  }

  if (error) {
    return <Text>{error}</Text>;
  }
  return (
    <AppointmentsContext.Provider value={appointments}>
      <Tab.Navigator
        screenOptions={{
          activeTintColor: '#FF7851',
          inactiveTintColor: 'gray',
          style: { backgroundColor: '#f8f9fa' },
          indicatorStyle: { backgroundColor: '#FF7851' },
        }}
      >
        <Tab.Screen name="Accepted" component={AcceptedAppointments} initialParams={{ data: accepted }} />
        <Tab.Screen name="Declined" component={DeclinedAppointments} initialParams={{ data: declined }} />
        <Tab.Screen name="Requests" component={RequestedAppointments} initialParams={{ data: requests }} />
      </Tab.Navigator>
    </AppointmentsContext.Provider>
  );
}

export default UpcomingAppointmentsNavigator;