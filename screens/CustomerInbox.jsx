import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../components/userContext';
import { getDatabase, onValue, off, ref as databaseRef } from "firebase/database";

const CustomerInbox = () => {
    const { customerID } = useUser();
    const navigation = useNavigation();
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const database = getDatabase();
        const inboxRef = databaseRef(database, `users/${customerID}/inbox`);

        const listener = onValue(inboxRef, snapshot => {
            const fetchedChats = [];
            snapshot.forEach(childSnapshot => {
                const chatData = childSnapshot.val();
                chatData.salonId = childSnapshot.key;  // Store the salonId
                fetchedChats.push(chatData);
            });
            setChats(fetchedChats);
        });

        return () => {
            off(inboxRef, 'value', listener);
        };
    }, [customerID]);

    const formatTimestamp = (timestamp) => {
        // ... your existing function here ...
        const date = new Date(timestamp);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const day = date.getDate();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthName = monthNames[date.getMonth()];
        const year = date.getFullYear();
        return `${hours}:${minutes}, ${day} ${monthName} ${year}`;
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={chats}
                keyExtractor={(item) => item.salonId}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.chatContainer}
                        onPress={() => navigation.navigate('CustomerUserMessagesScreen', {
                            salonName: item.salonName,
                            salonId: item.salonId
                        })}
                    >
                        <Text style={styles.chatName}>{item.salonName}</Text>
                        <Text style={styles.chatLastMessage}>{item.lastMessage}</Text>
                        <Text style={styles.chatTimestamp}>{formatTimestamp(item.timestamp)}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    chatContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
    },
    chatName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    chatLastMessage: {
        marginVertical: 5,
    },
    chatTimestamp: {
        fontStyle: 'italic',
    },
});

export default CustomerInbox;
