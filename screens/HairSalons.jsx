import React, { useState, useCallback, useEffect } from "react";
//import { Image } from "expo-image";
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
  KeyboardAvoidingView,

} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import Dashboard from "../components/Dashboard";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import SalonServices from "./SalonServices";
import { useRoute } from "@react-navigation/native";
import { getDatabase, ref as databaseRef, get, set, push, onValue } from 'firebase/database';
import { Picker } from "@react-native-picker/picker";
import { useUser } from "../components/userContext";
import CustomerInbox from "./CustomerInbox";
import CustomerUserMessagesScreen from "./CustomerUserMessagesScreen";
//import RNDateTimePicker from "@react-native-community/datetimepicker";
//import database from "@react-native-firebase/database";
import { getAuth } from 'firebase/auth';
import SalonDetailScreen from "./SalonDetailScreen";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Permissions from 'expo-permissions';
import { GeoFire } from 'geofire';
import * as Location from 'expo-location';
import LocationSearch from "../components/LocationSearch";
import debounce from 'lodash/debounce';

const HairSalons = () => {

  const navigation = useNavigation();
  const [salons, setSalons] = useState([]);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [nearbySalons, setNearbySalons] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(true); // Default to true
  const debouncedSetLocation = debounce((newLocation) => {
    setLocation(newLocation);
  }, 300);

  useFocusEffect(
    React.useCallback(() => {
      if (!location) return;

      const database = getDatabase();
      const geoFire = new GeoFire(databaseRef(database, 'locations'));

      setNearbySalons([]);

      const geoQuery = geoFire.query({
        center: [location.latitude, location.longitude],
        radius: 10
      });

      geoQuery.on("key_entered", (key, location, distance) => {
        console.log("here is key", key);
        const salonRef = databaseRef(database, `salons/${key}`);
        get(salonRef).then((snapshot) => {
          if (snapshot.exists()) {
            setNearbySalons(prevSalons => [...prevSalons, { ...snapshot.val(), id: key }]);
          }
        });
        console.log("nearby salons: ", nearbySalons);
      });

      return () => geoQuery.cancel();
    }, [location])
  );
  // const [modalVisible, setModalVisible] = useState(false);
  // const [appointmentTime, setAppointmentTime] = useState('');
  // const [serviceDescription, setServiceDescription] = useState('');
  // const [currentSalonId, setCurrentSalonId] = useState(null);
  // const [orderStatus, setOrderStatus] = useState({ salonId: null, serviceId: null });
  // const [selectedDate, setSelectedDate] = useState('Today');
  // const [timeInput, setTimeInput] = useState('');
  // const { fullname, profilePicture, logout, user } = useUser();
  const handleLocationSelect = (location) => {
    //console.log(location);
    setSelectedLocation(location);
    setShowSuggestions(false);
    setAddress(location.display_name);
    debouncedSetLocation({
      latitude: parseFloat(location.lat),
      longitude: parseFloat(location.lon)
    });
    setShowSuggestions(false);
  };

  const getCurrentLocation = async () => {
    //console.log("hello I am called")
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({});

      debouncedSetLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude
      });
      console.log("this is current location", location)

      const addressArray = await Location.reverseGeocodeAsync(currentLocation.coords);
      console.log("this is address: ", addressArray[0].city)
      setAddress(addressArray[0].city + ", " + addressArray[0].country);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const database = getDatabase();
    const salonsRef = databaseRef(database, 'salons');

    const listener = onValue(salonsRef, snapshot => {
      const fetchedSalons = [];
      snapshot.forEach(childSnapshot => {
        const salonData = childSnapshot.val();
        if (typeof salonData === 'object' && salonData !== null) {
          salonData.id = childSnapshot.key;
          fetchedSalons.push(salonData);
          //console.log("here is sallonData: ", salonData)
        }
      });
      setSalons(fetchedSalons);
    });




    return () => {
      salonsRef.off('value', listener);
    };
  }, []);
  console.log(salons);
  //console.log("salons data is here: ", salons)
  // console.log("Gallery:", item.gallery);
  //console.log("Services:", item.services);
  const handleLocationClick = async () => {
    try {
      let { status } = await Location.getForegroundPermissionsAsync();

      if (status !== 'granted') {
        const response = await Location.requestForegroundPermissionsAsync();
        status = response.status;
      }

      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      await getCurrentLocation();

    } catch (err) {
      console.error(err);
    }
  };

  const auth = getAuth();
  const handleAddressPress = () => {
    setShowSuggestions(true);
  };

  return (
    <>
      <LocationSearch
        onSelect={handleLocationSelect}
        showSuggestions={showSuggestions}
        onSearch={() => setShowSuggestions(true)}

      />
      <TouchableOpacity onPress={handleLocationClick}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            value={address}
            placeholder="Your Location"
            editable={false}
          />
          <Ionicons name="location-sharp" size={24} color="gray" />
        </View>
      </TouchableOpacity>
      <View style={styles.customerservice}>
        {nearbySalons.length === 0 && location ?
          <Text style={{ textAlign: 'center', marginTop: 20 }}>No salons in your area available.</Text>
          :
          <FlatList
            data={nearbySalons}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.salonContainer}
                onPress={() => navigation.navigate('SalonDetailScreen', { salon: item })}
              >
                <Image
                  style={styles.profilePic}
                  source={{ uri: (item.profile && item.profile.profilePicture) || "placeholder_image_url_here" }}
                />
                <Text style={styles.businessName}>{item.businessName}</Text>
                <Text style={styles.textInfo}>{item.description}</Text>
                {/* Gallery Section with placeholder check */}
                {(item.gallery && Object.keys(item.gallery).slice(0, 3).length > 0) && (
                  <View style={styles.galleryContainer}>
                    <Text style={styles.sectionHeader}>Gallery</Text>
                    <FlatList
                      data={Object.values(item.gallery).slice(0, 3)}
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
        }
      </View>

    </>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    borderRadius: 25,
    margin: 10
  },
  searchInput: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5'
  },
  customerservice: {
    flex: 1,
    backgroundColor: "#FAFAFA", // Light background for contrast
  },
  contactButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  contactButtonText: {
    color: "white",
    fontWeight: 'bold',
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
  timeInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 20,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60, // Perfect circle
    marginBottom: 15,
    alignSelf: "center",
  },
  businessName: {
    fontSize: FontSize.large,
    fontWeight: 'bold',
    marginBottom: 8,
    color: "#333", // Darker text for better readability
    textAlign: "center",
  },
  galleryImage: {
    width: 90,
    height: 90,
    marginRight: 10,
    borderRadius: 15,
  },
  serviceImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  textInfo: {
    fontSize: FontSize.medium,
    marginBottom: 5,
    color: "#555",
  },
  serviceContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 8,
    backgroundColor: "#F6F6F6", // Light grey background to differentiate service area
    borderRadius: 8,
    marginVertical: 5,
  },
  serviceText: {
    flex: 1,
  },

  sectionHeader: {
    fontSize: FontSize.large,
    fontWeight: 'bold',
    color: "#333",
    marginBottom: 10,
  },
  galleryContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  servicesContainer: {
    marginTop: 10,
  },
  orderButton: {
    backgroundColor: "blue", // Replace with your theme's primary color
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  orderButtonText: {
    color: "white",
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200
  }

});

export default HairSalons;
