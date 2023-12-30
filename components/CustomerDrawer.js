import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSalon } from "./salonContext";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import SalonLogInScreen from "../screens/SalonLoginScreen";
import Requests from "../screens/Bookings";
import { storage } from "@react-native-firebase/storage";
import { getStorage, ref as storageRef, put } from "firebase/storage";
import { uploadBytes, getDownloadURL } from "firebase/storage";
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

const CustomDrawer = (props) => {
  const [image, setImage] = React.useState(null);
  const Navigation = useNavigation();
  const storage = getStorage();

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

  const { salonName, setProfilePicture, logout, salon } = useSalon();
  useEffect(() => {
    getPermissionAsync();
    fetchProfilePicture();
  }, []);
  const fetchProfilePicture = async () => {
    const userDbRef = databaseRef(getDatabase(), `salons/${salon.uid}/profile`);
    const snapshot = await get(userDbRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      setImage(data.profilePicture);
      setProfilePicture(data.profilePicture);
    }
  };

  const getPermissionAsync = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
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

      if (!result.canceled) {
        console.log("Image picked:", result.assets[0].uri); // Debugging line

        setImage(result.assets[0].uri);

        console.log("before settinng storage reference:");
        console.log("Storage:", storage);
        console.log("Salon UID:", salon.uid);

        const imageName = `${new Date().getTime()}.jpg`;
        const imageRef = storageRef(
          storage,
          `profilePictures/${salon.uid}/${imageName}`
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
          `salons/${salon.uid}/profile`
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
          source={image ? { uri: image } : require("../assets/blankImage.png")}
          style={{
            width: 70,
            height: 70,
            borderRadius: 50,

            //backgroundColor: "blue",
          }}
        />
        <TouchableOpacity
          style={styles.cameraIconContainer}
          onPress={pickImage}
        >
          <Ionicons name="camera" size={20} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  const handleLogout = () => {
    logout();
    // If you have a login or welcome screen, navigate there after logging out:
    Alert.alert("Logged Out", "You have successfully logged out.");
    Navigation.navigate(SalonLogInScreen); // replace 'LoginScreen' with the name of your login screen.
  };

  const MenuOption = ({ icon, title, action }) => (
    <TouchableOpacity style={styles.menuOption} onPress={action}>
      <Ionicons name={icon} size={24} color="black" />
      <Text style={styles.menuOptionText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <ImageBackground
          //source={require("../assets/BackGround.png")}
          style={{ padding: 20 }}
        >
          <View style={styles.ImageContainer}>{renderImage()}</View>
          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              //fontFamily: "Roboto-Medium",
              left: 12,
              top: -30,
            }}
          >
            {salonName}
          </Text>
        </ImageBackground>
        <DrawerItemList {...props} />
        <View style={styles.menuContainer}>
          <MenuOption
            icon="log-out-outline"
            title="Logout"
            action={handleLogout}
          />
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  starIcon: {
    marginTop: 0,
    left: 0,
  },
  menuOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    //left: 20,
  },
  menuContainer: {
    //marginTop: 30,
    paddingHorizontal: 20,
    backgroundColor: "#FADFDF",
    height: 500,
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
    width: 70, // Desired width
    height: 70, // Desired height
    borderRadius: 50, // Desired border radius
    // ... other styles
  },
  roundImageContainer: {
    flexDirection: "row",
    width: 200,
    height: 100,
    top: 50,
    paddingLeft: 20,
    //position: "relative",
    //alignItems: "center",
    //justifyContent: "center",
  },
  cameraIconContainer: {
    ///position: "absolute",
    top: 40,
    right: 15, // adjust as needed
    //bottom: 20, // adjust as needed
    //backgroundColor: "white",
    borderRadius: 15,
    padding: 5,
  },
});

export default CustomDrawer;
