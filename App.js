import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, FlatList } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from "react-native-maps";
import { API_KEY } from '@env';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {

  const [isFocused, setIsFocused] = useState(false);
  //console.log(API_KEY)

  const [region, setRegion] = useState({
    latitude: 37.7749, // Default: San Francisco
    longitude: -122.4194,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [place, setPlace] = useState("");
  const [marker, setMarker] = useState(null);
  const [placesList, setPlacesList] = useState([]);

  useEffect(() => {
    loadPlaces();
  }, []);

  const searchPlace = async () => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(place)}&key=${API_KEY}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        console.log({lat, lng});
        setRegion({
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        const newPlace = { name: place, latitude: lat, longitude: lng };
        setMarker(newPlace);
        await savePlace(newPlace);
      } else {
        alert("Location not found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const savePlace = async (newPlace) => {
    try {
      const existingPlaces = await AsyncStorage.getItem("places");
      let placesArray = existingPlaces ? JSON.parse(existingPlaces) : [];

      placesArray.push(newPlace);
      await AsyncStorage.setItem("places", JSON.stringify(placesArray));

      setPlacesList(placesArray); // Update UI
    } catch (error) {
      console.error("Error saving place:", error);
    }
  };

  const loadPlaces = async () => {
    try {
      const storedPlaces = await AsyncStorage.getItem("places");
      if (storedPlaces) {
        setPlacesList(JSON.parse(storedPlaces));
      }
    } catch (error) {
      console.error("Error loading places:", error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text>Google places API</Text>
        <StatusBar style="dark" />
      </View>
      
      <View style = { styles.googleContainer }>
        <GooglePlacesAutocomplete
          placeholder='Search'
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            setPlace(details.description);
            console.log(place);
          }}
          query={{
            key: API_KEY,
            language: 'en',
          }}
          styles={{
            textInput: isFocused ? styles.textInputFocused : styles.textInput,
            container: styles.inputContainer
          }}
          
          textInputProps={
            {
              onFocus: ()=> setIsFocused(true),
              onblur: ()=> setIsFocused(false)
            }
          }
        />
      </View>

      <View style={styles.searchButton} >
        <Button title='Search' onPress={searchPlace}/>
      </View>

      <MapView
        style={styles.map}
        region={region}
        provider={"google"} // Ensures Google Maps is used
      >
        {marker && <Marker coordinate={marker} title={place} />}
      </MapView>

      <FlatList
        data={placesList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.name}</Text>
            <Text>Lat: {item.latitude}, Lng: {item.longitude}</Text>
          </View>
        )}
      />

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'cyan',
    paddingTop: 64,
    paddingBottom: 25,
    marginBottom: 24,
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    height: 48,
    borderRadius: 8,
    paddingLeft: 25,
    marginLeft: 16,
    marginRight: 16
  },
  textInputFocused: {
    borderWidth: 1,
    borderColor: 'cyan',
    height: 48,
    borderRadius: 8,
    paddingLeft: 25,
    marginLeft: 16,
    marginRight: 16
  },
  inputContainer: {
    width: '90%'
  },
  googleContainer: {
    height: 100,
    alignItems: 'center'
  },
  searchButton: {
    marginTop: 24,
    alignItems: 'center'
  },
  map: {
    marginTop: 24,
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24,
    height: '50%',
    alignItems: 'center'
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  }
});
