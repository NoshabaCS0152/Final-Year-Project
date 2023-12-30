import * as React from "react";
import {
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Button,
  Platform,
  ActivityIndicator,
  Dimensions,

} from "react-native";
import { useEffect, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRoute } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import { useContext, useState } from "react";
import CustomDrawer from "../components/CustomerDrawer";
import * as ImagePicker from 'expo-image-picker';
import { useSalon } from "../components/salonContext";

import { firebase } from "@react-native-firebase/database";
import { getDatabase, onValue, child, get, off, push, ref as databaseRef, set, remove } from "firebase/database";
import { uploadBytes, getDownloadURL } from "firebase/storage";
import { getStorage, ref as storageRef, put } from "firebase/storage";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { FlatList } from 'react-native';
import SalonInbox from "./SalonInbox";
//import RNFetchBlob from 'react-native-fetch-blob';



const SalonProfileScreen = () => {
  const navigation = useNavigation();

  const { salonName, profilePicture, salon } = useSalon();
  useFocusEffect(
    React.useCallback(() => {
      // This callback will run every time the screen comes into focus
      // You can trigger any side effects or state updates if needed
    }, [salonName])
  );
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    startingPrice: '',
    imageUrl: null
  });
  const [isModalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [galleryImagesArray, setGalleryImagesArray] = useState([]);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [currentService, setCurrentService] = useState({
    name: '',
    description: '',
    startingPrice: '',
    imageUrl: null
  });


  const dbRef = databaseRef(getDatabase());
  const storage = getStorage();

  const openEditModal = (service) => {
    setCurrentService(service);
    setImage(service.imageUrl);
    setEditModalVisible(true);
  };

  console.log("salon credintials: ", salon.uid)

  const uriToBlob = (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response); // when BlobModule finishes reading, resolve with the blob
      };
      xhr.onerror = function () {
        reject(new TypeError('Network request failed')); // error occurred, rejecting
      };
      xhr.responseType = 'blob'; // set response type to blob
      xhr.open('GET', uri, true); // open a GET request
      xhr.send(null); // send it out
    });
  };

  useEffect(() => {
    const reviewsDbRef = databaseRef(getDatabase(), `salons/${salon.uid}/reviews`);

    const unsubscribe = onValue(reviewsDbRef, (snapshot) => {
      if (snapshot.exists()) {
        const reviewsData = snapshot.val();
        const formattedReviews = Object.keys(reviewsData).map(key => ({
          key: key,
          ...reviewsData[key]
        }));
        setReviews(formattedReviews);
      }
    });

    return () => off(reviewsDbRef, 'value', unsubscribe);
  }, [salon.uid]);

  const uploadImageAndGetURL = async (imageUri, imageName) => {
    setIsLoading(true); // start loading
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const imageRef = storageRef(storage, imageName);
      await uploadBytes(imageRef, blob);
      const downloadURL = await getDownloadURL(imageRef);
      setIsLoading(false); // stop loading
      return downloadURL;
    } catch (error) {
      setIsLoading(false); // stop loading
      console.error("Failed to upload image: ", error);
      alert("Failed to upload image. Please try again.");
      return null;
    }
  };

  const pickServiceImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      const fileExtension = imageUri.split(".").pop();  // Extract the file extension
      const imageName = `serviceImages/${salon.uid}/${newService.name}-${new Date().getTime()}.${fileExtension}`;
      const downloadURL = await uploadImageAndGetURL(imageUri, imageName);
      if (downloadURL) {
        setNewService(prev => ({ ...prev, imageUrl: downloadURL }));
      }
    }
  };

  const pickEditServiceImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      const fileExtension = imageUri.split(".").pop();  // Extract the file extension
      const imageName = `serviceImages/${salon.uid}/${currentService.name}-${new Date().getTime()}.${fileExtension}`;
      const downloadURL = await uploadImageAndGetURL(imageUri, imageName);
      if (downloadURL) {
        setCurrentService(prev => ({ ...prev, imageUrl: downloadURL }));
      }
    }
  };


  const validateService = (service) => {
    const fields = ['name', 'description', 'startingPrice'];
    for (let field of fields) {
      if (service[field] === null || service[field] === '') {
        console.error(`Field "${field}" is missing or invalid.`);
        return false;
      }
    }
    return true;
  };


  const addNewService = async () => {
    // if (!newService.imageUrl) {
    //   console.error("Image is still uploading. Please wait.");
    //   return;
    // }
    if (validateService(newService)) {
      const servicesDbRef = databaseRef(getDatabase(), `salons/${salon.uid}/services`);
      const newServiceRef = push(servicesDbRef);
      await set(newServiceRef, newService);
      setNewService({ name: '', description: '', startingPrice: '', imageUrl: null });
      setModalVisible(false);
    } else {
      console.error("Validation failed. Ensure all fields are filled and an image is selected.");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      const fileExtension = imageUri.split(".").pop();  // Extract the file extension
      const imageName = `${new Date().getTime()}.${fileExtension}`;
      const imageRef = storageRef(storage, `galleryImages/${salon.uid}/${imageName}`);

      const response = await fetch(imageUri);
      const blob = await response.blob();
      await uploadBytes(imageRef, blob);

      const downloadURL = await getDownloadURL(imageRef);
      console.log("download url: ", downloadURL);

      const galleryDbRef = databaseRef(getDatabase(), `salons/${salon.uid}/gallery`);
      const newImageRef = push(galleryDbRef);
      await set(newImageRef, { imageUrl: downloadURL });

      setGalleryImagesArray(prevImages => [...prevImages, downloadURL]);
    }
  };
  useEffect(() => {
    const loadGalleryImages = async () => {
      const galleryDbRef = databaseRef(getDatabase(), `salons/${salon.uid}/gallery`);
      const snapshot = await get(galleryDbRef);
      if (snapshot.exists()) {
        const imageUrls = Object.values(snapshot.val()).map(value => value.imageUrl);
        setGalleryImagesArray(imageUrls);
      }
    };
    loadGalleryImages();
    // No need to turn off listening, as the get function does not keep listening to the database.
  }, [salon.uid]);

  useEffect(() => {
    const servicesDbRef = databaseRef(getDatabase(), `salons/${salon.uid}/services`);

    // This sets up a real-time listener
    const unsubscribe = onValue(servicesDbRef, (snapshot) => {
      if (snapshot.exists()) {
        const servicesData = snapshot.val();
        const formattedServices = Object.keys(servicesData).map(key => ({
          key: key,
          ...servicesData[key]
        }));
        setServices(formattedServices);
      }
    });

    // This will turn off listening to changes when component is unmounted
    return () => off(servicesDbRef, 'value', unsubscribe);
  }, [salon.uid]);


  const updateService = async () => {
    if (validateService(currentService)) {
      const servicesDbRef = databaseRef(getDatabase(), `salons/${salon.uid}/services/${currentService.key}`); // Ensure you're pointing to the correct service using the key
      const snapshot = await get(servicesDbRef);
      if (snapshot.exists()) {
        const existingService = snapshot.val();
        const updatedService = {
          ...existingService,
          ...currentService
        };
        await set(servicesDbRef, updatedService);
        setEditModalVisible(false);
      } else {
        console.error("The service does not exist in the database.");
      }
    } else {
      console.error("Validation failed. Ensure all edited fields are filled.");
    }
  };

  const deleteService = async (serviceKey) => {
    const serviceDbRef = databaseRef(getDatabase(), `salons/${salon.uid}/services/${serviceKey}`);
    await remove(serviceDbRef);
  };

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;

    const totalStars = reviews.reduce((accum, review) => accum + review.rating, 0);
    return totalStars / reviews.length;

  }, [reviews]);

  const totalReviews = reviews.length;

  return (
    <FlatList
      ListHeaderComponent={
        <>
          <View style={styles.container}>
            {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
            <View style={styles.profileHeader}>
              <Image
                style={styles.profileImage}
                resizeMode="cover"
                source={
                  typeof profilePicture === 'string'
                    ? { uri: profilePicture }
                    : require("../assets/blankImage.png")
                }
              />

              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{salonName}</Text>
                <Text style={styles.profession}>Hair Stylists</Text>

                {/* Render star icons */}
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

              </View>
            </View>
            <ScrollView>

              {/* Gallery Section */}
              <View style={styles.galleryContainer}>
                <Text style={styles.galleryTitle}>Gallery</Text>
                <ScrollView horizontal={true}>
                  {galleryImagesArray.map((imageUrl, index) => (
                    <Image key={index} source={{ uri: imageUrl }} style={styles.galleryImage} />
                  ))}
                  <TouchableOpacity style={styles.addImageButton} onPress={pickImage}>
                    <Text style={styles.addImageButtonText}>Add Image</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>

              {/* Services Section */}
              <View style={styles.servicesContainer}>
                <View style={styles.servicesHeader}>
                  <Text style={styles.servicesTitle}>Services</Text>
                  <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text style={styles.addServiceButton}>Add New Service</Text>
                  </TouchableOpacity>
                </View>
                {
                  services.map((service, index) => (
                    <View key={index} style={styles.serviceItemContainer}>
                      <Image source={{ uri: service.imageUrl }} style={styles.serviceImage} />
                      <View style={styles.serviceItemDetails}>
                        <Text style={styles.serviceName}>
                          {service.name}
                        </Text>
                        <Text style={styles.serviceDescription}>
                          {service.description}
                        </Text>
                        <Text style={styles.servicePrice}>
                          {`Starting at PKR${service.startingPrice}`}
                        </Text>
                        <View style={styles.serviceButtonsContainer}>
                          <TouchableOpacity onPress={() => openEditModal(service)} style={styles.editButton}>
                            <Text style={styles.editButtonText}>Edit</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => deleteService(service.key)} style={styles.deleteButton}>
                            <Text style={styles.deleteButtonText}>Delete</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  ))
                }
              </View>

              {
                isModalVisible && (
                  <View style={styles.modal}>
                    <TextInput
                      placeholder="Service Name"
                      value={newService.name}
                      onChangeText={(text) => setNewService(prev => ({ ...prev, name: text }))}
                    />
                    <TextInput
                      placeholder="Service Description"
                      value={newService.description}
                      onChangeText={(text) => setNewService(prev => ({ ...prev, description: text }))}
                    />
                    <TextInput
                      placeholder="Starting Price"
                      value={newService.startingPrice}
                      onChangeText={(text) => setNewService(prev => ({ ...prev, startingPrice: text }))}
                    />
                    <Button title="Select Image" onPress={pickServiceImage} />
                    <Button title="Save Service" onPress={addNewService} />
                    <Button title="Cancel" onPress={() => setModalVisible(false)} />
                  </View>
                )
              }

              {
                isEditModalVisible && (
                  <View style={styles.modal}>
                    <TextInput
                      placeholder="Service Name"
                      value={currentService.name}
                      onChangeText={(text) => setCurrentService(prev => ({ ...prev, name: text }))}
                    />
                    <TextInput
                      placeholder="Service Description"
                      value={currentService.description}
                      onChangeText={(text) => setCurrentService(prev => ({ ...prev, description: text }))}
                    />
                    <TextInput
                      placeholder="Starting Price"
                      value={currentService.startingPrice}
                      onChangeText={(text) => setCurrentService(prev => ({ ...prev, startingPrice: text }))}
                    />
                    <Button title="Select Image" onPress={pickEditServiceImage} />
                    <Button title="Update Service" onPress={updateService} />
                    <Button title="Cancel" onPress={() => setEditModalVisible(false)} />
                  </View>
                )
              }


              <View style={styles.reviewContainer}>
                <Text style={styles.reviewTitle}>Reviews</Text>
                <FlatList
                  data={reviews}
                  renderItem={({ item }) => {
                    console.log("review data", item)
                    return (
                      <View style={styles.reviewItemContainer}>

                        {/* Add avatar */}
                        <View style={styles.reviewHeader}>
                          <Image source={{ uri: item.userAvatar }} style={styles.avatar} />
                          <Text style={styles.reviewUsername}>{item.userName}</Text>
                        </View>

                        <Text style={styles.reviewText}>{item.reviewText}</Text>
                        <View style={styles.ratingContainer}>
                          {Array(item.rating).fill(0).map((_, index) => (
                            <Ionicons
                              key={index}
                              name="star-sharp"
                              size={24}  // Slightly increased size
                              color="#FFA07A"  // Soft Salmon color
                              style={styles.starIcon}
                            />
                          ))}
                        </View>
                      </View>
                    )
                  }}
                  keyExtractor={item => item.key}
                />
              </View>
            </ScrollView>
          </View>
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  reviewContainer: {
    padding: 20,  // Increased padding
    borderTopWidth: 1,
    borderTopColor: Color.border,
    backgroundColor: '#f4f4f4',  // Light background
  },
  reviewTitle: {
    fontSize: FontSize.large,
    fontFamily: FontFamily.bold,
    marginBottom: 15,  // Increased margin
  },
  reviewItemContainer: {
    marginVertical: 10,  // Increased margin
    padding: 10,  // Padding for the review card
    borderRadius: 8,  // Rounded corners for card
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,  // Circular avatar
    marginRight: 10,
  },
  reviewUsername: {
    fontWeight: 'bold',
    fontSize: FontSize.medium,
  },
  reviewText: {
    fontSize: FontSize.small,
    marginBottom: 10,  // Increased margin
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginRight: 5,  // Space between stars
  },
  container: {
    flex: 1,
    backgroundColor: Color.white,
    paddingHorizontal: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8, // Adjust as needed

  },
  galleryContainer: {
    marginTop: 20,
  },
  galleryTitle: {
    marginLeft: 10,
    fontSize: FontSize.size_4xl,
    color: Color.coral,
    fontWeight: "500",
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
    //top: -40
  },
  servicesTitle: {
    fontSize: FontSize.size_3xl,
    color: Color.coral,
    fontWeight: "500",
  },
  serviceItemContainer: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#FADFDF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  menuButton: {
    marginRight: 16,
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    marginLeft: 16,
    flexDirection: 'column',
    flex: 1, // This ensures the 
  },
  profileName: {
    fontSize: FontSize.size_3xl,
    color: Color.coral,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",

  },
  profession: {
    fontSize: FontSize.size_xl,
    color: Color.coral,
    fontFamily: FontFamily.poppinsMedium,
    marginVertical: 4,

  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  starIcon: {
    marginHorizontal: 2, // Reduce margin between stars
  },
  ratingText: {
    fontSize: FontSize.size_l,
    color: Color.coral,
    fontFamily: FontFamily.poppinsMedium,
    marginLeft: 8,  // This will create a gap between the stars and rating text
  },
  gallerySection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: FontSize.size_4xl,
    color: Color.coral,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    marginBottom: 16,
  },
  galleryImage: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 10,
  },
  addImageButton: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImageButtonText: {
    color: Color.coral,
    fontSize: FontSize.size_xl,
  },
  servicesSection: {
    padding: 16,
  },
  servicesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  addServiceButton: {
    color: Color.coral,
    textDecorationLine: "underline",
    fontSize: FontSize.size_xl,
  },
  serviceItemDetails: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between'
  },
  serviceButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  addPicture: {
    left: 20
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 6,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#007BFF',
    padding: 6,
    borderRadius: 5,
    marginRight: 10,
  },

  editButtonText: {
    color: '#FFFFFF', // White text color
    fontWeight: 'bold',
  },
  serviceName: {
    fontSize: 22, // Increased the size
    fontWeight: "bold",
    color: "#333", // Changed to dark color for contrast against the light background
    marginBottom: 5, // A small margin to give it some breathing space from the description
  },

  serviceDescription: {
    fontSize: 16, // Slightly smaller font size than the name
    color: "#555", // A slightly lighter shade than the name for a subtle look
    marginBottom: 5, // Margin to separate it from the price
  },

  servicePrice: {
    fontSize: 18, // A font size between the name and description
    fontWeight: "500", // Medium font weight
    color: "#444", // A shade between the name and description
  },
  addImageButton: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 10,
    // top: 120,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImageButtonText: {
    color: Color.coral,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.poppinsMedium,
  },
  modal: {
    position: 'absolute',
    top: '60%',
    left: '50%',
    transform: [
      { translateX: -Dimensions.get('window').width * 0.45 },  // considering modal width is 90% of screen width
      { translateY: -Dimensions.get('window').height * 0.2 }   // assuming modal height is 40% of screen height
    ],
    width: '90%',
    padding: 20,
    backgroundColor: Color.white,
    elevation: 5,  // Android shadow
    shadowOffset: { width: 0, height: 2 },  // iOS shadow
    shadowOpacity: 0.25,  // iOS shadow
    shadowRadius: 3.84,  // iOS shadow
    borderRadius: 5,
    zIndex: 10000,
  },
  galleryImage: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 10,
  },
  servicesContainer: {
    marginTop: 20,
  },
  serviceImage: {
    width: 60,    // Increased size for a better view
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },

  serviceItem: {
    marginTop: 5,
    marginLeft: 10,
    color: Color.black,
    fontSize: FontSize.size_xl,
    textAlign: "left",
    fontFamily: FontFamily.poppinsMedium,
  },
  addServiceButton: {

    marginTop: 10,
    marginLeft: 10,
    color: Color.coral,
    fontSize: FontSize.size_xl,
    textAlign: "left",
    fontFamily: FontFamily.poppinsMedium,
    textDecorationLine: "underline"
  },

  gallery: {
    left: 10,
    textAlign: "left",
    color: Color.coral,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    fontSize: FontSize.size_4xl,
  },
  services: {
    top: 341,
    left: 6,
    position: "absolute",

  },

});

export default SalonProfileScreen;
