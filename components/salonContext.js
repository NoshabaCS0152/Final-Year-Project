// UserContext.js

import React, { createContext, useState, useContext } from "react";

const SalonContext = createContext();

export const useSalon = () => {
  return useContext(SalonContext);
};

export const SalonProvider = ({ children }) => {
  const [salonName, setSalonName] = useState(null);
  const [salonNameInCutomer, setsalonNameInCutomer] = useState(null);
  const [profilePicture, setProfilePicture] = useState(
    require("../assets/blankImage.png")
  );
  const [salon, setSalon] = useState(null);

  const logout = () => {
    setSalon(null); // remove the user data
    setSalonName(null); // reset fullname
    // If you also want to reset profile picture on logout, uncomment the line below
    // setProfilePicture(require("../assets/blankImage.png"));
    // Optionally: If you're storing a token in AsyncStorage or another storage, clear that too.
    // AsyncStorage.removeItem('userToken');
  };
  const value = {
    salon,
    setSalon,
    salonName,
    setSalonName,
    profilePicture,
    setProfilePicture,
    logout, // added the logout function
  };

  return (
    <SalonContext.Provider value={value}>{children}</SalonContext.Provider>
  );
};

export default SalonContext;
