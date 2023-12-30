import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet
} from "react-native";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { useNavigation } from '@react-navigation/native';
const CustomerSettingsScreen = () => {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [city, setCity] = useState("");
    const navigation = useNavigation();


    const fetchUserData = () => {
        const auth = getAuth();
        const user = auth.currentUser;
        const db = getDatabase();
        const userRef = ref(db, 'users/' + user.uid);


        onValue(userRef, (snapshot) => {
            const userData = snapshot.val();
            console.log("this is password:", userData)
            if (userData) {
                setFullname(userData.fullname || "");
                setEmail(userData.email || "");
                setPassword(userData.password || "")
                // Assuming city might not be present initially for older users.

            }
        });
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleUpdate = () => {
        const auth = getAuth();
        const user = auth.currentUser;
        const db = getDatabase();
        const userRef = ref(db, 'users/' + user.uid);


        const updatedData = {
            fullname,
            email,
            password,
        };

        update(userRef, updatedData).then(() => {
            Alert.alert("Profile updated successfully!");
            //navigation.goBack();
        }).catch((error) => {
            Alert.alert("Error updating profile", error.message);
        });
    };
    const UpdateSecurityTextEntry = () => {
        setPassword({
            ...password,
            secureTextEntry: !password.secureTextEntry
        })
    }

    return (
        <View style={styles.container}>
            <TextInput
                value={fullname}
                onChangeText={setFullname}
                placeholder="Full Name"
                style={styles.input}
            />
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                style={styles.input}
            />
            <View style={{ flexDirection: 'row' }}>
                <TextInput
                    //value={password}
                    secureTextEntry={password.secureTextEntry ? false : true}
                    onChangeText={(password) => setPassword(password)}
                    placeholder="Password"

                    style={{
                        borderWidth: 1,
                        borderColor: "#ddd",
                        padding: 10,
                        fontSize: 18,
                        borderRadius: 6,
                        marginBottom: 10,
                        width: 300
                    }}
                />
                <TouchableOpacity
                    onPress={UpdateSecurityTextEntry}>

                    {password.secureTextEntry ?
                        <Ionicons name="eye-outline" size={25} color="#949096" style={{ marginTop: 15 }}></Ionicons>
                        :
                        <Ionicons name="eye-off-outline" size={25} color="#949096" style={{ marginTop: 15 }}></Ionicons>
                    }
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#007BFF",
        padding: 10,
        borderRadius: 6,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        textAlign: "center",
    },
});

export default CustomerSettingsScreen;
