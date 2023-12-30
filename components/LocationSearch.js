import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";
const LocationSearch = ({ onSelect, showSuggestions, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  //const [showSuggestions, setShowSuggestions] = useState(true); // Step 1

  useEffect(() => {
    if (searchTerm === "") {
      setResults([]);
      return;
    }

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

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Ionicons name="locate" size={20} color="gray" />
        <TextInput
          value={searchTerm}
          onChangeText={(text) => {
            setSearchTerm(text);
            if (onSearch) onSearch();
          }}
          placeholder="Search location"
          style={styles.input}
        />
      </View>
      {showSuggestions && (
        <FlatList
          data={results}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onSelect(item)}
              style={styles.listItem}
            >
              <Text style={styles.listText}>{item.display_name}</Text>
            </TouchableOpacity>
          )}
          style={styles.list}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    //top: 40,
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
  input: {
    flex: 1, // to ensure the input takes the remaining width in the row
    fontSize: 16,
    marginLeft: 10, // space between icon and input
  },
  list: {
    maxHeight: 200, // maximum height for suggestions list
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
    padding: 10,
  },
  listText: {
    fontSize: 14,
  },
});

export default LocationSearch;
