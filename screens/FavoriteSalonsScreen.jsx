import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { getDatabase, ref as databaseRef, get } from 'firebase/database';
import { useUser } from "../components/userContext";
import { Color, FontSize } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";

const FavoriteSalonsScreen = () => {
    const navigation = useNavigation();
    const [favoriteSalons, setFavoriteSalons] = useState([]);
    const { customerID } = useUser();

    useEffect(() => {
        const fetchFavoriteSalons = async () => {
            const database = getDatabase();
            const userFavoriteRef = databaseRef(database, `users/${customerID}/favoriteSalons`);
            const snapshot = await get(userFavoriteRef);

            if (snapshot.exists()) {
                setFavoriteSalons(snapshot.val());
            }
        };

        fetchFavoriteSalons();
    }, [customerID]);


    return (
        <View style={styles.container}>
            <FlatList
                data={favoriteSalons}
                keyExtractor={(salon) => salon.id}
                renderItem={({ item: salon }) => (
                    <TouchableOpacity style={styles.salonContainer} onPress={() => { navigation.navigate('SalonDetailScreen', { salon: salon }) }}>
                        <Image style={styles.salonImage} source={{ uri: salon.profile?.profilePicture || "placeholder_image_url_here" }} />
                        <Text style={styles.salonName}>{salon.businessName}</Text>
                        {(salon.gallery && Object.keys(salon.gallery).slice(0, 3).length > 0) && (
                            <View style={styles.galleryContainer}>
                                <Text style={styles.sectionHeader}>Gallery</Text>
                                <FlatList
                                    data={Object.values(salon.gallery).slice(0, 3)}
                                    keyExtractor={(imgObj, index) => `image-${index}`}
                                    renderItem={({ item: imgObj }) => (
                                        <Image style={styles.galleryImage} source={{ uri: imgObj.imageUrl || "placeholder_image_url_here" }} />
                                    )}
                                    horizontal={true}
                                />
                            </View>
                        )}

                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFAFA",
        padding: 15
    },
    sectionHeader: {
        fontSize: FontSize.large,
        fontWeight: 'bold',
        color: "#333",
        marginBottom: 10,
    },
    salonContainer: {
        padding: 15,
        backgroundColor: "white", // Card-style background
        margin: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },

        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    salonImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10
    },
    salonName: {
        fontSize: FontSize.large,
        fontWeight: 'bold',
        marginBottom: 8,
        color: "#333", // Darker text for better readability
        // textAlign: "center",
    },
    galleryImage: {
        width: 100,  // adjust these as needed
        height: 100,
        marginRight: 10
    },
    galleryContainer: {
        marginTop: 20,
        marginBottom: 10,
    },

});

export default FavoriteSalonsScreen;
