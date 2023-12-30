// ProfileScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Ionicons from "react-native-vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";
import { useUser } from '../components/userContext';
import LogInScreen from './LogInScreen';
import CustomerSettingsScreen from './customerSettingsScreen';
import { getStorage, ref as storageRef, put } from "firebase/storage";
import { uploadBytes, getDownloadURL } from "firebase/storage";
import { useFocusEffect } from '@react-navigation/native';
import {
    getDatabase,
    onValue,
    child,
    get,
    off,
    push,
    ref as databaseRef,
    set,
} from "firebase/database";
import FavoriteSalonsScreen from './FavoriteSalonsScreen';
import UpcommingAppointments from './UpcommingAppointments';


const ProfileScreen = ({ route, navigation }) => {
    // Retrieving the fullname from the passed parameters
    //const fullname = route.params ? route.params.fullname : "User";
    //console.log(fullname)
    const { fullname, setProfilePicture, logout, customerID } = useUser();
    const storage = getStorage();

    const [modalVisible, setModalVisible] = useState(false);
    const [updatedFullName, setUpdatedFullName] = useState(fullname); // Assuming 'fullname' is the user's current full name
    const [updatedCity, setUpdatedCity] = useState(''); // Initialize to current city or leave empty


    useFocusEffect(
        React.useCallback(() => {
            // This callback will run every time the screen comes into focus
            // You can trigger any side effects or state updates if needed
        }, [fullname])
    );

    console.log(fullname);
    console.log("this is user uid", customerID);
    const [image, setImage] = React.useState(null);
    useEffect(() => {
        getPermissionAsync();
        fetchProfilePicture();
    }, []);


    const uriToBlob = (uri) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function () {
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });
    };

    const getPermissionAsync = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    const fetchProfilePicture = async () => {
        const userDbRef = databaseRef(getDatabase(), `users/${customerID}/profile`);
        const snapshot = await get(userDbRef);

        if (snapshot.exists()) {
            const data = snapshot.val();
            setImage(data.profilePicture);
            setProfilePicture(data.profilePicture);
        }
    };


    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [2, 2],
                quality: 1,
            });
            //console.log("image", result);

            // if (!result.canceled) {  // Changed from cancelled to canceled
            //     setImage(result.assets[0].uri);  // Changed from result.uri
            //     setProfilePicture(result.assets[0].uri);
            // }

            if (!result.canceled) {
                console.log("Image picked:", result.assets[0].uri); // Debugging line

                setImage(result.assets[0].uri);

                console.log("before settinng storage reference:");
                console.log("Storage:", storage);
                console.log("user UID:", customerID);

                const imageName = `${new Date().getTime()}.jpg`;
                const imageRef = storageRef(
                    storage,
                    `profilePictures/${customerID}/${imageName}`
                );

                console.log("About to create blob from URI");
                const blob = await uriToBlob(result.assets[0].uri);
                console.log("Blob created:", blob);

                console.log("About to upload to Firebase");
                await uploadBytes(imageRef, blob);
                console.log("Upload complete");

                console.log("Image uploaded to Firebase Storage."); // Debugging line
                console.log("Getting download URL");
                const downloadURL = await getDownloadURL(imageRef);
                console.log("Download URL:", downloadURL);

                const userDbRef = databaseRef(
                    getDatabase(),
                    `users/${customerID}/profile`
                );
                await set(userDbRef, { profilePicture: downloadURL });
                console.log("Image URL saved in Firebase Database."); // Debugging line
            }
        } catch (error) {
            console.error("Error during the image upload process:", error);
            Alert.alert("Error", "An error occurred while uploading the image.");
        }


    };

    const renderImage = () => {
        return (
            <View style={styles.roundImageContainer}>
                <Image
                    source={image ? { uri: image } : require('../assets/blankImage.png')}
                    style={{ width: 70, height: 70, borderRadius: 50 }}
                />
                <TouchableOpacity style={styles.cameraIconContainer} onPress={pickImage}>
                    <Ionicons name="camera" size={20} color="black" />
                </TouchableOpacity>
                <Text style={{ left: 25 }}>{fullname}</Text>
            </View>
        );
    };

    const handleLogout = () => {
        logout();
        // If you have a login or welcome screen, navigate there after logging out:
        Alert.alert("Logged Out", "You have successfully logged out.");
        navigation.navigate(LogInScreen); // replace 'LoginScreen' with the name of your login screen.
    }


    const MenuOption = ({ icon, title, action }) => (
        <TouchableOpacity style={styles.menuOption} onPress={action}>
            <Ionicons name={icon} size={24} color="black" />
            <Text style={styles.menuOptionText}>{title}</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.ImageContainer}>
                {renderImage()}
            </View>

            <View style={styles.menuContainer}>
                <MenuOption icon="heart-outline" title="Favorite Salons" action={() => { navigation.navigate(FavoriteSalonsScreen) }} />
                <MenuOption icon="settings-outline" title="Settings" action={() => { navigation.navigate(CustomerSettingsScreen) }} />
                <MenuOption icon="calendar-outline" title="Appointments" action={() => { navigation.navigate(UpcommingAppointments) }} />
                <MenuOption icon="log-out-outline" title="Logout" action={handleLogout} />
            </View>
            {/* Add more MenuOption components here if needed */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        //alignItems: 'center',
    },
    menuContainer: {
        //marginTop: 30,
        paddingHorizontal: 20,
        backgroundColor: "#FADFDF",
        height: 500,
    },

    menuOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    menuOptionText: {
        marginLeft: 15,
        fontSize: 16,
    },

    ImageContainer: {
        flex: 1,
        flexDirection: "row",
        height: 170,
        width: 400,
        top: 0,
        left: -20,
        //marginBottom: 10,
        paddingBottom: 50,
        backgroundColor: "#FF7851",

        //right: "10.62%",
        // bottom: "82.78%",
    },
    imageStyle: {
        width: 70,       // Desired width
        height: 70,      // Desired height
        borderRadius: 50, // Desired border radius
        // ... other styles
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    name: {
        fontSize: 18,
        marginBottom: 20,
    },
    roundImageContainer: {
        flexDirection: "row",
        width: 200,
        height: 200,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cameraIconContainer: {
        position: 'absolute',
        right: 70, // adjust as needed
        bottom: 60, // adjust as needed
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 5,
    },

});

export default ProfileScreen;
