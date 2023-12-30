// UserContext.js

import React, { createContext, useState, useContext, useEffect } from "react";
import {
  getDatabase,
  onValue,
  child,
  get,
  off,
  push,
  ref as databaseRef,
  set,
  remove,
} from "firebase/database";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [fullname, setFullname] = useState(null);
  const [salonCurrentID, setsalonCurrentID] = useState(null);
  const [profilePicture, setProfilePicture] = useState(
    require("../assets/blankImage.png")
  );
  const [customerID, setcustomerID] = useState(null);
  useEffect(() => {
    const database = getDatabase();
    const customerRef = databaseRef(database, `users/${customerID}/`);

    onValue(customerRef, (snapshot) => {
      const customerData = snapshot.val();

      if (customerData && customerData.fullname) {
        console.log("customerName:", customerData.fullname);
        setFullname(customerData.fullname);
      }
    });
  }, [customerID]); // Make sure to include customerID in the dependency list

  //setFullname(fullname);
  const logout = () => {
    setcustomerID(null); // remove the user data
    setFullname(null); // reset fullname
    // If you also want to reset profile picture on logout, uncomment the line below
    // setProfilePicture(require("../assets/blankImage.png"));
    // Optionally: If you're storing a token in AsyncStorage or another storage, clear that too.
    // AsyncStorage.removeItem('userToken');
  };
  const value = {
    customerID,
    setcustomerID,
    fullname,
    setFullname,
    profilePicture,
    setProfilePicture,
    salonCurrentID,
    setsalonCurrentID,
    logout, // added the logout function
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
