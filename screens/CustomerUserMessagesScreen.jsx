import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TextInput, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useUser } from '../components/userContext';
import { getDatabase, onValue, child, get, off, push, ref as databaseRef, set, remove } from "firebase/database";

const CustomerUserMessagesScreen = ({ route }) => {

    const { salonName, salonId } = route.params;
    const { fullname, customerID } = useUser();
    const [messages, setMessages] = useState([]);
    const [reply, setReply] = useState('');
    console.log("here is salonId: ", salonId)
    useEffect(() => {
        const database = getDatabase();

        // Fetch messages sent by the customer to the salon
        const salonMessagesRef = databaseRef(database, `salons/${salonId}/messages/${customerID}/`);
        const userMessagesRef = databaseRef(database, `users/${customerID}/messages/${salonId}/`);  // Path to get messages from the salon

        const fetchMessages = async () => {
            const salonSnapshot = await get(salonMessagesRef);
            const userSnapshot = await get(userMessagesRef);

            let combinedMessages = [];

            // Include messages sent by the customer to the salon
            salonSnapshot.forEach(childSnapshot => {
                const messageData = childSnapshot.val();
                if (messageData.customerID === customerID) {
                    combinedMessages.push({
                        ...messageData,
                        id: childSnapshot.key
                    });
                }
            });

            // Include messages sent by the salon to the customer
            userSnapshot.forEach(childSnapshot => {
                const messageData = childSnapshot.val();
                combinedMessages.push({
                    ...messageData,
                    id: childSnapshot.key
                });
            });

            // Sort by timestamp
            combinedMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

            setMessages(combinedMessages);
        };

        fetchMessages();

        // Set up a listener if you want real-time updates as well
        // For simplicity, I've not included that here

    }, [salonId, customerID]);

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

    const handleSend = async () => {
        if (reply.trim()) {
            const database = getDatabase();
            const newMessageRef = push(databaseRef(database, `salons/${salonId}/messages/${customerID}/`));
            const newMessage = {
                customerID: customerID,
                sender: fullname,
                text: reply,
                timestamp: new Date().toISOString()
            };
            await set(newMessageRef, newMessage);
            console.log("message has been sent: ", newMessage)

            // Update the inbox
            const inboxRef = databaseRef(database, `users/${customerID}/inbox/${salonId}/`);
            await set(inboxRef, {
                salonName: salonName,
                lastMessage: reply,
                timestamp: new Date().toISOString()
            });

            // Here's the change: Update the messages state to include the new message
            setMessages(prevMessages => [...prevMessages, { ...newMessage, id: newMessageRef.key }]);

            setReply('');
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Chat with {salonName}</Text>
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.messageContainer}>
                        <Text style={styles.sender}>{item.sender}</Text>
                        <Text style={styles.messageText}>{item.text}</Text>
                        <Text style={styles.timestamp}>{formatTimestamp(item.timestamp)}</Text>
                    </View>
                )}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    multiline={true}
                    numberOfLines={4}
                    placeholder="Enter your message here..."
                    onChangeText={setReply}
                    value={reply}
                />
                <Button title="Send" onPress={handleSend} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    messageContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    sender: {
        fontWeight: 'bold',
    },
    messageText: {
        marginVertical: 5,
    },
    timestamp: {
        fontStyle: 'italic',
    },
});

export default CustomerUserMessagesScreen;
