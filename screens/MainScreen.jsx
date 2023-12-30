import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { Color, FontFamily, Border, FontSize, Margin } from "../GlobalStyles";
import WomenServices from "./WomenServices";
import UpcommingAppointments from "./UpcommingAppointments";
import Maps from "./Maps";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MenServices from "./MenServices";
import { useUser } from "../components/userContext";
import * as ImagePicker from 'expo-image-picker';
import FavoriteSalonsScreen from "./FavoriteSalonsScreen";
import LocationSearch from "../components/LocationSearch";
import { getDatabase, ref as databaseRef, get, set, push, onValue } from 'firebase/database';
import { GeoFire } from 'geofire';
import debounce from 'lodash/debounce';
const Tab = createBottomTabNavigator();

const MainScreen = ({ route }) => {
  //const { userId, fullname } = route.params;
  const Navigation = useNavigation();

  //const fullname = route.params ? route.params.fullname : null;
  const { fullname, customerID } = useUser();
  const [salons, setSalons] = useState([]);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [nearbySalons, setNearbySalons] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [profilePicture, setProfilePicture] = useState(
    require("../assets/blankImage.png")
  );
  const [showSuggestions, setShowSuggestions] = useState(true); // Default to true

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);


  const debouncedSetLocation = debounce((newLocation) => {
    setLocation(newLocation);
  }, 300);

  useEffect(() => {
    if (searchTerm === "") {
      setResults([]);
      return;
    }

    setShowSuggestions(true); // Set suggestions to show every time searchTerm changes

    const fetchLocations = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${searchTerm}`
        );
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, [searchTerm]);

  const fetchProfilePicture = async () => {
    const userDbRef = databaseRef(getDatabase(), `users/${customerID}/profile`);
    const snapshot = await get(userDbRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      //  setImage(data.profilePicture);
      setProfilePicture(data.profilePicture);
    }
  };

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
  //const route = useRoute();
  useFocusEffect(
    React.useCallback(() => {

      // This callback will run every time the screen comes into focus
      // You can trigger any side effects or state updates if needed
    }, [fullname])
  );

  useEffect(() => {

    fetchProfilePicture();
  }, []);


  const handleLocationSelect = (location) => {
    //console.log(location);
    setSelectedLocation(location);
    setAddress(location.display_name);
    debouncedSetLocation({
      latitude: parseFloat(location.lat),
      longitude: parseFloat(location.lon)
    });
    setShowSuggestions(false);

  };
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


  console.log('full name:', fullname);

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


  return (
    <View style={styles.mainScreen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ justifyContent: "center", flex: 1 }}
      >
        <View style={[styles.user, styles.userPosition]}>
          <View height={65}>
            <Image
              style={styles.ProfilePic}
              resizeMode="cover"
              source={
                typeof profilePicture === 'string'
                  ? { uri: profilePicture }
                  : require("../assets/blankImage.png")
              }
            />
            <Text style={[styles.komalShaikh, styles.komalShaikhClr]}>
              {fullname}
            </Text>
            <Text
              style={[
                styles.sukkurIbaUniversity,
                styles.selectTypesTypo1,
                styles.komalShaikhClr,
              ]}
            >
              {/* 65200, Sukkur IBA University */}
            </Text>


          </View>
        </View>

        <View style={styles.locationSearchContainer}>
          <View style={styles.searchBox}>
            <Ionicons name="locate" size={20} color="gray" />
            <TextInput
              value={searchTerm}
              onChangeText={(text) => {
                setSearchTerm(text);
              }}
              placeholder="Search location"
              style={styles.inputLocation}
            />
          </View>
          {showSuggestions && (
            <FlatList
              data={results}
              keyExtractor={(item) => item.place_id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleLocationSelect(item)} // Replaced onSelect with handleLocationSelect
                  style={styles.listItem}
                >
                  <Text style={styles.listText}>{item.display_name}</Text>
                </TouchableOpacity>
              )}
              style={styles.list}
            />
          )}
        </View>
        <TouchableOpacity onPress={handleLocationClick} style={{ marginBottom: -20 }}>
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

        <ScrollView>
          <Text style={[styles.exclusiveOffers]}>Exclusive Offers</Text>

          <View style={[styles.rectangleGroup]}>
            <Image
              style={styles.imageRemovebgPreview1Icon}
              resizeMode="cover"
              source={require("../assets/imageremovebgpreview-1.png")}
            />
            <Text style={[styles.ext22Bea]}>EXT 22% BEARA</Text>
            <Text style={[styles.raOffOnRd]}>OFF ON RD</Text>

            <View style={[styles.rectangleCodeCom]}>
              <Text style={[styles.useCodeCom201]}>Use code: COM201</Text>
            </View>
          </View>

          <Text
            style={[
              styles.upcomingAppointments,
              styles.womenTypo,
              styles.selectTypesTypo1,
            ]}
          >
            Upcoming Appointments
          </Text>

          <TouchableOpacity
            style={[styles.viewAll, styles.viewAllTypo]}
            activeOpacity={0.1}
            onPress={() => Navigation.navigate(UpcommingAppointments)}
          >
            <Text style={{ fontSize: 18, color: "rgba(0, 0, 0, 0.62)" }}>
              view all
            </Text>
          </TouchableOpacity>

          <View style={{ flexDirection: "row", top: 50 }}>
            <View style={[styles.groupView]}>
              <Image
                style={[styles.download11, styles.downloadLayout]}
                resizeMode="cover"
                source={require("../assets/download-1-1.png")}
              />
              <Text style={styles.maneBeautylocks}>Mane Beautylocks</Text>
              <Text style={styles.sat16thu}>Sat 16,thu 5:00 pm</Text>
            </View>

            <View style={[styles.groupView2]}>
              <Image
                style={[styles.download12, styles.downloadLayout]}
                resizeMode="cover"
                source={require("../assets/download-1-2.png")}
              />
              <Text style={styles.mane2}>Mane Beautylocks</Text>
              <Text style={styles.sat2}>Sat 16,thu 5:00 pm</Text>
            </View>
          </View>

          <Text style={{ top: 35, left: 20, fontWeight: 700, fontSize: 18 }}>
            Near By Salons
          </Text>
          <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>
            {

              nearbySalons.map(salon => {
                console.log("this is gallery", salon.id)
                return (
                  <TouchableOpacity
                    onPress={() => Navigation.navigate('SalonDetailScreen', { salon: salon })}>
                    <View key={salon.id} style={{ top: 50, marginBottom: 10, flexDirection: 'row', marginBottom: 10, elevation: 2, borderRadius: 5, backgroundColor: '#fff', padding: 10 }}>
                      <Image
                        style={{ width: 60, height: 60, borderRadius: 50 }}
                        source={{ uri: (salon.profile && salon.profile.profilePicture) || "placeholder_image_url_here" }}
                        resizeMode="cover"
                      />
                      <Text style={{ fontWeight: 'bold', marginTop: 20, left: 10 }}>{salon.businessName}</Text>
                      <Text>{salon.description}</Text>

                    </View>
                  </TouchableOpacity>
                )
              })
            }
          </View>


        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  galleryContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  locationSearchContainer: {
    backgroundColor: "#FADFDF",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchBox: {
    flexDirection: "row", // to display children side-by-side
    alignItems: "center", // vertically center the icon and text input
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10, // horizontal padding
    paddingVertical: 5, // vertical padding
    marginBottom: 10,
  },
  listText: {
    fontSize: 14,
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
    padding: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    borderRadius: 25,
    margin: 10,

  },
  inputLocation: {
    flex: 1, // to ensure the input takes the remaining width in the row
    fontSize: 16,
    marginLeft: 10, // space between icon and input
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
    flex: 1,
    marginLeft: 8,
    top: 8
  },


  userPosition: {
    left: "2.57%",
  },



  selectTypesTypo1: {
    fontFamily: FontFamily.poppinsSemibold,
    fontWeight: "600",
  },

  womenTypo: {
    fontSize: FontSize.size_3xl,
    textAlign: "left",
    color: Color.black,
  },

  mane2: {
    top: -45,
    left: 85,
  },
  sat2: {
    top: -45,
    left: 85,
    fontFamily: FontFamily.poppinsRegular,
  },

  komalShaikh: {
    height: "47.2%",
    width: "44.69%",
    top: -45,
    left: "24.31%",
    fontSize: 22,
    textAlign: "left",
    fontFamily: FontFamily.poppinsRegular,
  },
  sukkurIbaUniversity: {
    height: "30.43%",
    width: "57.37%",
    top: "-65.77%",
    left: "24.39%",
    fontSize: 14,
    textAlign: "left",
  },
  ProfilePic: {
    width: "22.45%",
    right: "77.55%",
    left: "0%",
    bottom: "0%",
    top: "25%",
    height: "100%",
    maxHeight: "100%",
    maxWidth: "100%",
    borderRadius: 50,
    //position: "absolute",
    overflow: "hidden",
  },
  user: {
    height: "12.28%",
    width: "91.81%",
    top: "4.94%",
    right: "5.62%",
    bottom: "82.78%",
    marginBottom: 40,
  },


  exclusiveOffers: {
    height: "6.27%",
    width: "58.46%",
    top: "5.98%",
    left: "6.24%",
    fontFamily: FontFamily.iBMPlexSansKRSemibold,
    fontWeight: "600",
    fontSize: FontSize.size_4xl,
    color: Color.black,
  },
  upcomingAppointments: {
    height: "5.84%",
    width: "69.47%",
    top: "15.15%",
    left: "4.44%",
  },
  viewAll: {
    height: "4.08%",
    width: "25.64%",
    top: "10.51%",
    left: "77.93%",
    color: "rgba(0, 0, 0, 0.62)",
  },
  selectTypes: {
    height: "3.55%",
    width: "37.44%",
    top: "56.03%",
    left: "4.44%",
    textAlign: "left",
    //position: "absolute",
  },


  imageRemovebgPreview1Icon: {
    left: 174,
    width: 229,
    height: 129,
    top: -5,
    //position: "absolute",
  },

  ext22Bea: {
    marginBlockStart: 0,
    marginBlockEnd: 0,
    left: 12,
    fontSize: 26,
    color: "#926842",
    //whiteSpace: "pre-wrap",
    width: 210,
    top: -118,
    textAlign: "left",
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
  },
  raOffOnRd: {
    marginBlockStart: 0,
    marginBlockEnd: 0,
    left: 12,
    fontSize: 26,
    color: "#926842",
    top: -120,
  },

  useCodeCom201: {
    top: 0,
    left: 10,
    margin: 3,
    fontWeight: "700",
    color: Color.white,
    fontSize: FontSize.size_2xl,
    textAlign: "left",
  },
  rectangleCodeCom: {
    top: -115,
    width: 160,
    left: 12,
    backgroundColor: "#e14203",
    borderRadius: 5,
  },
  rectangleGroup: {
    height: "28.76%",
    width: "94.5%",
    top: "8.61%",
    bottom: "53.93%",
    left: "4.5%",
    borderRadius: Border.br_md,
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    backgroundColor: Color.mistyrose,
    bottom: "0%",
  },



  download12: {
    width: 63,
    left: 0,
    top: 6,
  },

  download11: {
    top: 4,
    left: 6,
    width: 71,
  },
  maneBeautylocks: {
    top: -45,
    left: 85,
  },
  sat16thu: {
    top: -45,
    left: 85,
    fontFamily: FontFamily.poppinsRegular,
  },

  groupView: {
    height: "58.23%",
    width: "64.87%",
    top: "5.21%",
    //right: "32.56%",
    left: 10,
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    backgroundColor: Color.mistyrose,
    borderRadius: Border.br_sm,
    margin: 0,
  },
  groupView2: {
    height: "62.23%",
    width: "80.87%",
    top: "5.21%",
    //right: "32.56%",
    left: 20,
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    backgroundColor: Color.mistyrose,
    borderRadius: Border.br_sm,
  },

  women1Icon: {
    height: 55,
    top: -30,
    width: 160,
    left: 170,
    backgroundColor: Color.mistyrose,
    borderRadius: 20,
  },


  men: {
    top: -39,
    left: 78,
    width: 62,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    fontSize: FontSize.size_3xl,
    textAlign: "left",
    color: Color.black,
    //position: "absolute",
  },
  women: {
    top: -40,
    left: 78,
    width: 62,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    fontSize: FontSize.size_3xl,
    textAlign: "left",
    color: Color.black,
    height: 55,
    //position: "absolute",
  },
  men1Icon: {
    top: 22,
    width: 140,
    left: 15,
    backgroundColor: Color.mistyrose,
    borderRadius: 20,
    height: 55,
  },

  mainScreen: {
    backgroundColor: Color.white,
    flex: 1,
    height: 926,
    //overflow: "hidden",
    width: "100%",
  },
});

export default MainScreen;