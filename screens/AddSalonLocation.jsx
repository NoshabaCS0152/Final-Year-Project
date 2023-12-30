import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getDatabase, ref, set } from 'firebase/database';
import { GeoFire } from 'geofire';
import { useSalon } from "../components/salonContext";

const database = getDatabase();
const geoFire = new GeoFire(ref(database, 'locations'));

const AddSalonLocation = () => {
    const [address, setAddress] = useState("");
    const [location, setLocation] = useState(null);
    const { salon } = useSalon();
    const searchForLocation = async () => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`);
            const results = await response.json();
            if (results && results.length > 0) {
                const loc = results[0];
                setLocation({
                    latitude: parseFloat(loc.lat),
                    longitude: parseFloat(loc.lon),
                });
                console.log(location);
            }
        } catch (error) {
            console.error("Error searching address:", error);
        }
    };
    const handleSaveLocation = async () => {
        if (!location) {
            alert('Please set the location first.');
            return;
        }

        // Store location in GeoFire
        try {
            await geoFire.set(salon.uid, [location.latitude, location.longitude]);

            // Also save location in salon's data
            const salonLocationRef = ref(database, `salons/${salon.uid}/location`);
            await set(salonLocationRef, {
                latitude: location.latitude,
                longitude: location.longitude
            });

            alert('Location saved successfully!');

        } catch (error) {
            console.error('Error saving location:', error);
            alert('Failed to save location. Please try again.');
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Set Salon Location</Text>
            <TextInput
                placeholder="Enter Address"
                value={address}
                onChangeText={setAddress}
                style={styles.textInput}
            />
            <Button title="Search Location" onPress={searchForLocation} />
            {location && (

                <MapView
                    style={styles.map}
                    initialRegion={{
                        ...location,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    {location && location.latitude && location.longitude && (
                        <Marker coordinate={location} />
                    )}

                </MapView>

            )}
            <Button title="Save Location to Firebase" onPress={handleSaveLocation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
    },
    map: {
        flex: 1,
        width: '100%',
    }
});

export default AddSalonLocation;
