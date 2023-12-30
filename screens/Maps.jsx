import React from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function Maps() {
  return (
    <View style={styles.container}>
      {/* Google Places Autocomplete */}
      <GooglePlacesAutocomplete
        placeholder="Search in Sukkur, Pakistan"
        onPress={(data, details = null) => {
          // Handle the selected place data here
          console.log(data); // The selected place data will be logged to the console
        }}
        query={{
          key: 'AIzaSyCFUexqn4k9yE1fvBECykRXg-qED5615KQ',
          language: 'en', // Language of the results
          components: 'country:pk', // Limit search results to Pakistan (country code 'pk')
          types: 'geocode', // Limit the search results to geographical locations
          location: '27.7053,68.8574', // Sukkur city coordinates (latitude, longitude)
          radius: 10000, // Search within a 10km radius of Sukkur city
        }}
        styles={{
          container: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1,
          },
          textInputContainer: {
            backgroundColor: 'rgba(0,0,0,0)',
            borderTopWidth: 0,
            borderBottomWidth: 0,
          },
          textInput: {
            marginLeft: 0,
            marginRight: 0,
            height: 38,
            color: '#5d5d5d',
            fontSize: 16,
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
        }}
      />
      {/* Map View */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 27.7053,
          longitude: 68.8574,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {/* Add markers or other map components */}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
