import "react-native-gesture-handler";
import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { useContext, useState, useEffect, useCallback } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import Bookings from "./Requests";
import Requests from "./Bookings";
import { useRoute } from "@react-navigation/native";
import { useSalon } from "../components/salonContext";
import UserMessagesScreen from "./userMessagesScreen";
import { useFocusEffect } from '@react-navigation/native';

import { getDatabase, onValue, child, get, off, push, ref as databaseRef, set, remove } from "firebase/database";

const SalonInbox = () => {
  const navigation = useNavigation();
  const { salonName, profilePicture, salon } = useSalon();
  let customerUID = null;

  const [messages, setMessages] = useState([]);
  const [userMessageGroups, setUserMessageGroups] = useState([]);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const database = getDatabase();
    const messagesRef = databaseRef(database, `salons/${salon.uid}/messages`);

    onValue(messagesRef, snapshot => {
      const messagesData = snapshot.val();
      const formattedConversations = [];

      for (let customerId in messagesData) {
        const customerMessages = Object.values(messagesData[customerId]);
        const lastMessage = customerMessages[customerMessages.length - 1];
        formattedConversations.push({
          customerId,
          customerName: lastMessage.sender,
          lastMessage: lastMessage.text,
          timestamp: lastMessage.timestamp
        });
      }

      setConversations(formattedConversations);
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        keyExtractor={item => item.customerId}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => navigation.navigate('UserMessagesScreen', { customerId: item.customerId })}
          >
            <Text style={styles.listItemText}>{item.customerName}</Text>
            <Text>{item.lastMessage}</Text>
            <Text>{item.timestamp}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f2f2f2',
  },
  listItem: {
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,  // for Android
  },
  listItemText: {
    fontSize: 18,
  },
});

export default SalonInbox;
