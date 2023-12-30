import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
    Image,
    StyleSheet,
    Text,
    Pressable,
    View,
    TouchableOpacity,
    Modal,
    TextInput,
    FlatList,
    ScrollView,
    KeyboardAvoidingView,

} from "react-native";
import { useRoute } from '@react-navigation/native';
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { Picker } from "@react-native-picker/picker";
import { useUser } from "../components/userContext";
import { useNavigation } from "@react-navigation/native";
import CustomerUserMessagesScreen from "./CustomerUserMessagesScreen";
import { getDatabase, ref as databaseRef, get, set, push, onValue, off } from 'firebase/database';
import Ionicons from "react-native-vector-icons/Ionicons";
import FavoriteSalonsScreen from "./FavoriteSalonsScreen";
//import DateTimePicker from '@react-native-community/datetimepicker';
const SalonDetailScreen = () => {
    const route = useRoute();
    const { salon } = route.params;
    const navigation = useNavigation();
    const [salons, setSalons, setsalonCurrentID] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [appointmentTime, setAppointmentTime] = useState('');
    const [serviceDescription, setServiceDescription] = useState('');
    const [currentSalonId, setCurrentSalonId] = useState(null);
    const [orderStatus, setOrderStatus] = useState({ salonId: null, serviceId: null });
    const [selectedDate, setSelectedDate] = useState('Today');
    const [timeInput, setTimeInput] = useState('');
    const { fullname, profilePicture, logout, customerID } = useUser();
    const [orderStatuses, setOrderStatuses] = useState({});
    const [selectedServiceId, setSelectedServiceId] = useState(null);
    const [serviceName, setServiceName] = useState(null)
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [starRating, setStarRating] = useState(0);
    const [favoriteSalons, setFavoriteSalons] = useState([]);
    const [isFavorited, setIsFavorited] = useState(favoriteSalons.some(fav => fav.id === salon.id));
    useEffect(() => {
        setIsFavorited(favoriteSalons.some(fav => fav.id === salon.id));
    }, [favoriteSalons, salon.id]);
    const [reviews, setReviews] = useState([]);

    const orderConfirmed = async (salonId, serviceId) => {
        const database = getDatabase();
        // Collect user information

        const orderData = {
            customerID: customerID,
            salonId: salonId,
            serviceId: serviceId,
            userName: fullname,  // Assuming 'fullname' is the user's name in your code.
            userProfilePic: profilePicture,  // Assuming 'image' is the user's profile pic.
            setTime: timeInput,  // You need to replace this with the actual set time.
            setDate: selectedDate,  // Replace this with the set date.
            description: serviceDescription,  // Replace this with the order description.
            status: "Appointment requested",
            serviceName: serviceName
        };

        const updatedStatuses = { ...orderStatuses, [`${salonId}-${serviceId}`]: "Appointment Requested" };
        console.log("After:", updatedStatuses);
        setOrderStatuses(updatedStatuses);
        // Send order/request to the salon
        const salonOrderRef = push(databaseRef(database, `salons/${salonId}/orders`));
        const customerOrderRef = push(databaseRef(database, `orderDetails`));
        await set(salonOrderRef, orderData);
        await set(customerOrderRef, orderData);
        console.log("Order sent successfully!");
        // console.log("Before:", orderStatuses);
        // const userOrderStatusRef = databaseRef(database, `users/${customerID}/orderStatuses`);
        //await set(userOrderStatusRef, updatedStatuses);
    };

    const contactSalon = (salonName, salonId) => {
        navigation.navigate('CustomerUserMessagesScreen', { salonName: salonName, salonId: salonId });
    };

    const handleFavoriteToggle = async (salon) => {
        let updatedFavorites;
        let currentlyFavorited = favoriteSalons.some(fav => fav.id === salon.id);

        if (currentlyFavorited) {
            // Remove from favorites if it already exists
            updatedFavorites = favoriteSalons.filter(fav => fav.id !== salon.id);
        } else {
            // Add to favorites if it doesn't exist
            updatedFavorites = [...favoriteSalons, salon];
        }

        setIsFavorited(!currentlyFavorited);  // Toggle the favorited status
        setFavoriteSalons(updatedFavorites);  // Update the favorite salons

        // Store the updated favorites in Firebase
        await storeFavoriteSalonsInFirebase(updatedFavorites);
    }

    const StarComponent = ({ onStarPress, starIndex, filled }) => {
        const name = filled ? 'star' : 'star-outline';
        const color = filled ? '#FF7851' : 'grey';
        //  console.log("this is filled", starIndex)
        return (
            <TouchableOpacity onPress={() => onStarPress(starIndex)}>
                <Ionicons name={name} size={24} color={color} />
            </TouchableOpacity>
        );
    };


    const storeFavoriteSalonsInFirebase = async (updatedFavorites) => {
        const database = getDatabase();
        const userFavoriteRef = databaseRef(database, `users/${customerID}/favoriteSalons`);
        await set(userFavoriteRef, updatedFavorites);
    };

    useEffect(() => {
        // Fetch the favorite salons from Firebase
        const fetchFavoriteSalons = async () => {
            const database = getDatabase();
            const favSalonRef = databaseRef(database, `users/${customerID}/favoriteSalons`);

            const snapshot = await get(favSalonRef);
            if (snapshot.exists()) {
                const favArray = Object.values(snapshot.val());
                setFavoriteSalons(favArray);
            }
            else {
                setFavoriteSalons([]);
            }
        }

        fetchFavoriteSalons();
    }, [customerID]);


    const submitReview = async () => {
        console.log("Review:", review);
        console.log("Rating:", rating);
        if (review.trim() === '' || rating === 0) {
            alert('Please write a review and select a rating.');
            return;
        }

        const database = getDatabase();
        const reviewData = {
            reviewText: review,
            rating: rating,
            userId: customerID,
            userName: fullname,
            userProfilePic: profilePicture,
        };

        const salonReviewRef = push(databaseRef(database, `salons/${salon.id}/reviews`));
        await set(salonReviewRef, reviewData);

        alert('Review submitted successfully!');

        // Reset the review fields
        setReview('');
        setRating(0);
        await set(salonReviewRef, reviewData);
        setReviews(prevReviews => [...prevReviews, reviewData]);

    };

    useEffect(() => {
        const fetchReviews = async () => {
            const database = getDatabase();
            const reviewsRef = databaseRef(database, `salons/${salon.id}/reviews`);
            const snapshot = await get(reviewsRef);

            if (snapshot.exists()) {
                setReviews(Object.values(snapshot.val()));
            }
        }

        fetchReviews();
    }, []);
    const averageRating = useMemo(() => {
        if (reviews.length === 0) return 0;

        const totalStars = reviews.reduce((accum, review) => accum + review.rating, 0);
        return totalStars / reviews.length;

    }, [reviews]);

    const totalReviews = reviews.length;


    useEffect(() => {
        const database = getDatabase();
        const orderStatusRef = databaseRef(database, `users/${customerID}/orderStatuses`);

        // Listener for changes in order statuses
        const onOrderStatusChange = onValue(orderStatusRef, (snapshot) => {
            if (snapshot.exists()) {
                const updatedStatuses = snapshot.val();
                setOrderStatuses(updatedStatuses);
            }
        });

        // Cleanup
        return () => {
            off(orderStatusRef, onOrderStatusChange);
        };
    }, [customerID]);


    useEffect(() => {
        const fetchOrderStatuses = async () => {
            const database = getDatabase();
            const orderStatusRef = databaseRef(database, `users/${customerID}/orderStatuses`);

            const snapshot = await get(orderStatusRef);
            if (snapshot.exists()) {
                setOrderStatuses(snapshot.val());
            }
        }

        fetchOrderStatuses();
    }, [customerID]);
    const getButtonText = (salonId, serviceId) => {
        const statusKey = `${salonId}-${serviceId}`;
        const status = orderStatuses[statusKey];

        if (!status) {
            return "Set Appointment";
        }

        switch (status) {
            case "accepted":
                return "Appointment Done";
            case "declined":
                return "Request Appointment";
            default:
                return status; // This will show "Appointment Requested" or other custom statuses
        }
    };

    const StarRating = ({ rating }) => {
        return (
            <View style={{ flexDirection: 'row' }}>
                {[1, 2, 3, 4, 5].map(star => (
                    <Text key={star} style={{ marginRight: 5, color: star <= rating ? '#FF7851' : '#D0D0D0' }}>★</Text>
                ))}
            </View>
        );
    };

    return (
        <ScrollView style={styles.container}>
            <Image
                style={styles.profilePic}
                source={{ uri: salon.profile && salon.profile.profilePicture || "placeholder_image_url_here" }}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.businessName}>{salon.businessName}</Text>
                <TouchableOpacity onPress={() => handleFavoriteToggle(salon)}>
                    <Ionicons
                        name={isFavorited ? 'heart' : 'heart-outline'}
                        size={24}
                        color={isFavorited ? 'red' : 'grey'}
                        style={{ marginLeft: 10 }}
                    />
                </TouchableOpacity>
            </View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center', left: 90
            }}>
                {Array(5).fill(0).map((_, index) => (
                    <Ionicons
                        key={index}
                        name="star-sharp"
                        size={20}
                        color={index < Math.round(averageRating) ? "#FF7851" : "#D1D1D1"}
                        style={styles.starIcon}
                    />
                ))}
                <Text style={styles.ratingText}>{averageRating.toFixed(1)}({totalReviews})</Text>
            </View>
            <TouchableOpacity style={styles.contactButton} onPress={() => contactSalon(salon.businessName, salon.id)}>
                <Text style={styles.contactButtonText}>Contact Salon</Text>
            </TouchableOpacity>

            {/* Gallery Section */}
            {(salon.gallery && Object.keys(salon.gallery).length > 0) && (
                <View style={styles.galleryContainer}>
                    <Text style={styles.sectionHeader}>Gallery</Text>
                    <FlatList
                        data={Object.values(salon.gallery)}
                        keyExtractor={(imgObj, index) => `image-${index}`}
                        renderItem={({ item: imgObj }) => (
                            <Image style={styles.galleryImage} source={{ uri: imgObj.imageUrl || "placeholder_image_url_here" }} />
                        )}
                        horizontal={true}
                    />
                </View>
            )}

            {/* Services Section */}
            {(salon.services && Object.keys(salon.services).length > 0) && (
                <View style={styles.servicesContainer}>
                    <Text style={styles.sectionHeader}>Services</Text>
                    {Object.entries(salon.services).map(([serviceId, service], idx) => {
                        // console.log("this is service name: ", service.name)
                        //  setServiceName(service.name)
                        //console.log("this is customer current ID",sa)
                        return (
                            <View key={idx} style={styles.serviceContainer}>
                                <Image style={styles.serviceImage} source={{ uri: service.imageUrl || "placeholder_image_url_here" }} />
                                <View style={styles.serviceText}>
                                    <Text style={styles.serviceName}>{service.name}</Text>
                                    <Text style={styles.serviceDescription}>{service.description}</Text>
                                    <Text style={styles.servicePrice}>PKR{service.startingPrice}</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.orderButton}
                                    onPress={() => {
                                        setCurrentSalonId(salon.id);
                                        setSelectedServiceId(serviceId); // Set serviceId here
                                        setModalVisible(true);
                                        setServiceName(service.name);
                                    }}
                                >
                                    <Text style={styles.orderButtonText}>
                                        {getButtonText(salon.id, serviceId)}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>
            )}


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Set Appointment</Text>

                        <Picker
                            selectedValue={selectedDate}
                            style={{ height: 50, width: 150 }}
                            onValueChange={(itemValue) => setSelectedDate(itemValue)}
                        >
                            <Picker.Item label="Today" value="Today" />
                            <Picker.Item label="Tomorrow" value="Tomorrow" />
                            {/* Add more days as needed */}
                        </Picker>

                        {/* Time Input */}
                        <TextInput
                            style={styles.timeInput}
                            placeholder="Enter time (HH:MM)"
                            value={timeInput}
                            onChangeText={setTimeInput}
                            keyboardType="numbers-and-punctuation"
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Service Description"
                            onChangeText={setServiceDescription}
                            value={serviceDescription}
                        />

                        <TouchableOpacity
                            style={[styles.orderButton, styles.buttonClose]}
                            onPress={() => {
                                setOrderStatus(prev => ({ ...prev, status: 'Appointment Requested' }));
                                // Here, you'll need to retrieve the serviceId of the service for which the user is setting the appointment.
                                orderConfirmed(currentSalonId, selectedServiceId); // replace 'selectedServiceId' with the actual service ID.
                                // This will send the order to the currently selected salon
                                setModalVisible(false);
                            }}
                        >
                            <Text style={styles.orderButtonText}>Confirm</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>

            <View style={{ padding: 10, backgroundColor: '#FFF', borderRadius: 5, elevation: 3 }}>
                <Text style={styles.textInfo}>Leave a Review:</Text>
                <TextInput
                    style={styles.reviewInput} // changed to reviewInput
                    placeholder="Type your review here"
                    value={review}
                    onChangeText={setReview}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                    {[1, 2, 3, 4, 5].map(index => (
                        <StarComponent
                            key={index}
                            starIndex={index}
                            filled={index <= starRating}
                            onStarPress={selectedStars => {
                                console.log("Updating star rating to:", selectedStars);
                                setStarRating(selectedStars);
                                setRating(selectedStars);
                            }}
                        />
                    ))}
                </View>
                <TouchableOpacity
                    style={styles.submitReviewButton}
                    onPress={submitReview}
                >
                    <Text style={{ color: '#FFF' }}>Submit Review</Text>

                </TouchableOpacity>


            </View>
            <View style={{ marginTop: 20, marginBottom: 60 }}>
                <Text style={styles.ReviewssectionHeader}>Reviews</Text>
                <View style={styles.ratingContainer}>
                    {Array(5).fill(0).map((_, index) => (
                        <Ionicons
                            key={index}
                            name="star-sharp"
                            size={20}
                            color={index < Math.round(averageRating) ? "#FF7851" : "#D1D1D1"}
                            style={styles.starIcon}
                        />
                    ))}
                    <Text style={styles.ratingText}>{averageRating.toFixed(1)}({totalReviews})</Text>
                </View>

                {reviews.map((reviewData, index) => (
                    <View key={index} style={styles.reviewContainer}>
                        <Text style={styles.reviewsUserName}>{reviewData.userName}</Text>
                        <StarRating rating={reviewData.rating} />
                        <Text style={styles.reviewsText}>{reviewData.reviewText}</Text>
                    </View>
                ))}
            </View>

        </ScrollView>

    );
};

const styles = StyleSheet.create({
    reviewContainer: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#FFF',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,

    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ReviewssectionHeader: {
        fontSize: FontSize.large,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 15,
        paddingLeft: 5,

    },
    reviewsUserName: {
        fontWeight: 'bold',
        marginBottom: 5
    },
    reviewsText: {
        marginTop: 5,
        color: '#7D7D7D'
    },
    submitReviewButton: {
        backgroundColor: '#FF7851',
        padding: 12, // Increased padding slightly
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 40,
    },
    reviewInput: { // New style for the review input
        width: '100%',
        height: 120, // Increased height for multiline reviews
        borderColor: '#E0E0E0', // Lighter color for border
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 12,
        paddingTop: 10, // Added padding top for multiline reviews
        fontSize: FontSize.medium, // Added font size for better readability
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        marginBottom: 20
    },
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        padding: 15
    },
    profilePic: {
        width: 150,
        height: 150,
        borderRadius: 75,
        alignSelf: "center",
        marginBottom: 20,
        borderColor: Color.primary,
        borderWidth: 3,
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
    },
    businessName: {
        fontSize: FontSize.xlarge,
        fontWeight: 'bold',
        color: '#333333',
        textAlign: "center",
        marginBottom: 10
    },
    textInfo: {
        fontSize: FontSize.medium,
        color: '#7D7D7D',
        textAlign: "center",
        marginBottom: 8
    },
    contactButton: {
        backgroundColor: '#FF7851',
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 25,
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 3
    },
    contactButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: FontSize.medium
    },
    sectionHeader: {
        fontSize: FontSize.large,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 15,
        paddingLeft: 5
    },
    galleryContainer: {
        marginTop: 10,
        marginBottom: 25
    },
    galleryImage: {
        width: 150,
        height: 100,
        borderRadius: 15,
        marginRight: 10,
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    servicesContainer: {
        marginBottom: 25
    },
    serviceContainer: {
        backgroundColor: '#FFFFFF',  // White background for contrast
        borderRadius: 10,            // Rounded corners
        shadowColor: '#000',        // Shadow for depth
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,        // Light shadow
        shadowRadius: 3.84,
        elevation: 5,               // Elevation for Android
        marginVertical: 10,         // Spacing between cards
        padding: 15,                // Inner padding
    },
    serviceImage: {
        width: '100%',              // Take the full width of the card
        height: 200,                // Fixed height for consistency
        borderRadius: 8,            // Slightly rounded corners
        marginBottom: 10            // Space below the image
    },
    serviceName: {
        fontSize: FontSize.large,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 5
    },
    serviceDescription: {
        fontSize: FontSize.medium,
        color: '#7D7D7D',
        marginBottom: 10              // Space before the price
    },
    servicePrice: {
        fontSize: FontSize.medium,
        color: '#FF7851',            // Use the primary color for price
        fontWeight: 'bold',
        marginBottom: 10              // Space before the button
    },
    serviceText: {
        flex: 1
    },
    orderButton: {
        backgroundColor: '#FF7851',
        borderRadius: 5,
        paddingVertical: 8,          // Vertical padding for button
        paddingHorizontal: 15,       // Horizontal padding for button
        alignSelf: 'flex-start'      // Align to the start
    },
    orderButtonText: {
        color: '#FFFFFF',
        fontSize: FontSize.medium,
        fontWeight: 'bold'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    modalView: {
        width: '85%',
        backgroundColor: '#FAFAFA',
        borderRadius: 20,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        fontSize: FontSize.large,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 15
    },
    timeInput: {
        width: '100%',
        height: 40,
        borderColor: Color.mediumText,
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 10,
        marginBottom: 20
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: Color.mediumText,
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 10,
        marginBottom: 20
    }
});

export default SalonDetailScreen;
