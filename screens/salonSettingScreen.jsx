import React, { useState, useEffect, useCallback } from 'react';
import Geocoding from 'react-native-geocoding';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getDatabase, ref, get, set, update } from "firebase/database";
import { useSalon } from '../components/salonContext';
import { useFocusEffect } from '@react-navigation/native';


function SalonSettingsScreen({ navigation }) {
    const [businessName, setBusinessName] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [discription, setDiscription] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // Assuming useSalon provides an object named 'salon' representing the user

    const { salon, salonName, setSalonName } = useSalon();

    // This will fetch the current salon's details from Firebase when the screen loads
    useFocusEffect(
        useCallback(() => {
            const fetchSalonDetails = async () => {
                const db = getDatabase();
                const salonRef = ref(db, "salons/" + salon.uid); // user.uid should be the current logged in user's ID

                try {
                    const snapshot = await get(salonRef);
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        setBusinessName(data.businessName || "");
                        setAddress(data.address || "");
                        setDiscription(data.discription || "")
                        setEmail(data.email || "")
                        setPassword(data.password || "")

                    } else {
                        console.log("No data available");
                    }
                } catch (error) {
                    console.error("Error fetching data: ", error);
                    Alert.alert('Error fetching data');
                }
            };

            fetchSalonDetails();
        }, []));


    const handleSave = async () => {
        const db = getDatabase();
        const salonRef = ref(db, `salons/${salon.uid}`);

        const updatedData = {
            businessName: businessName,
            address: address,
            discription: discription,
            email: email,
            password, password
        };

        try {
            await update(salonRef, updatedData);
            setSalonName(businessName);
            console.log("salon name in salonSettings screen", salonName)
            Alert.alert('Profile updated successfully');
        } catch (error) {
            console.error("Error updating data: ", error);
            Alert.alert('Error updating profile');
        }
    }


    return (
        <View style={styles.container}>
            <TextInput
                value={businessName}
                onChangeText={setBusinessName}
                placeholder="Business Name"
                style={styles.input}
            />

            <TextInput
                value={discription}
                onChangeText={setDiscription}
                placeholder="Discription"
                style={styles.input}
            />

            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                style={styles.input}
            />
            <TextInput
                value={[password]}
                onChangeText={setPassword}
                placeholder="Password"
                style={styles.input}
            />

            {/* <GooglePlacesAutocomplete
                placeholder="Enter Address"
                onPress={handlePress}
                query={{
                    key: 'AIzaSyCFUexqn4k9yE1fvBECykRXg-qED5615KQ',
                    language: 'en',
                }}
                styles={{
                    textInputContainer: styles.textInputContainer,
                    textInput: styles.textInput,
                }}
            /> */}
            <Button title="Save" onPress={handleSave} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
    }
});

export default SalonSettingsScreen;
