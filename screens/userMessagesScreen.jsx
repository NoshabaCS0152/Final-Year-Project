import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TextInput, Button } from 'react-native';
import { getDatabase, onValue, child, get, off, push, ref as databaseRef, set, remove } from "firebase/database";
import { useSalon } from '../components/salonContext';

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const day = date.getDate();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthName = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${hours}:${minutes}, ${day} ${monthName} ${year}`;
};
const UserMessagesScreen = ({ route }) => {
  const { customerId } = route.params;
  const { salonName, salon } = useSalon();
  const [messages, setMessages] = useState([]);
  const [replyText, setReplyText] = useState('');
  const salonId = salon?.uid;

  const handleSendReply = () => {
    const database = getDatabase();
    const newMessageRef = push(databaseRef(database, `salons/${salonId}/messages/${customerId}`));
    set(newMessageRef, {
      sender: salonName,  // Assuming the salon replies with its name
      text: replyText,
      timestamp: new Date().getTime()
    });

    setReplyText('');  // Clear the reply input
  };


  useEffect(() => {
    const database = getDatabase();
    const customerMessagesRef = databaseRef(database, `salons/${salonId}/messages/${customerId}`);

    const unsubscribe = onValue(customerMessagesRef, snapshot => {
      const customerMessagesData = snapshot.val();

      if (!customerMessagesData) {
        console.log('No messages found.');
        setMessages([]);
        return;
      }

      const formattedMessages = Object.values(customerMessagesData).map(msg => ({
        messageId: msg.messageId || "",
        sender: msg.sender || "",
        content: msg.text || "",
        timestamp: msg.timestamp || new Date().getTime()
      }));

      setMessages(formattedMessages);
    });

    return () => unsubscribe();  // Clean up listener on unmount

  }, [customerId, salonId]);
  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={item => item.messageId ? item.messageId.toString() : item.timestamp.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageBox}>
            <Text style={styles.senderText}>{item.sender}:</Text>
            <Text style={styles.messageText}>{item.content}</Text>
          </View>
        )}
      />
      <View style={styles.replyBox}>
        <TextInput
          style={styles.replyInput}
          value={replyText}
          onChangeText={setReplyText}
          placeholder="Type your reply..."
        />
        <Button
          title="Send"
          onPress={handleSendReply}
          style={styles.sendButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 15,
  },
  messageBox: {
    padding: 15,
    backgroundColor: 'white',
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  senderText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  messageText: {
    fontSize: 16,
  },
  replyBox: {
    backgroundColor: 'white',
    padding: 15,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },
  replyInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  sendButton: {
    marginTop: 10,
  },
});

export default UserMessagesScreen;