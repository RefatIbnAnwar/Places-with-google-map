import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_KEY } from '@env';



const GoogleMapWithSearch = ({ navigation }) => {
    const [isFocused, setIsFocused] = useState(false);

    const [region, setRegion] = useState({
        latitude: 37.7749,
        longitude: -122.4194,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

    const [place, setPlace] = useState("");
    const [marker, setMarker] = useState(null);

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
    } catch (error) {
      console.error("Error saving place:", error);
    }
  };

  return (
    <View style= {styles.container}>
     <MapView
        style={styles.map}
        region={region}
        provider={"google"} // Ensures Google Maps is used
     >
        {marker && <Marker coordinate={marker} title={place} />}
     </MapView>
      
      <View style = { styles.overlay }>
        <GooglePlacesAutocomplete
          placeholder='Search location or Address'
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            setPlace(details.description);
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
              onblur: ()=> setIsFocused(false),
            }
          }
        />

        <View style= {styles.buttonContainer}>
            <Button title='Search' style={styles.searchButton} onPress={searchPlace}/>
            <Button title="View Searched Places" style={styles.searchButton} onPress={() => navigation.navigate("PlacesList")} />
        </View>
        
     </View>
          
    </View>
    
  );
};

const styles = StyleSheet.create({

    container: { flex: 1 },

    overlay: {
        position: "absolute",
        top: 64,
        left: 10,
        right: 10,
        backgroundColor: "rgba(255, 255, 255, 0.0)",
        padding: 10,
        borderRadius: 10,
      },
    textInput: {
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.0)",
      height: 48,
      borderRadius: 8,
      paddingLeft: 25,
    },
    textInputFocused: {
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 1.0)",
      height: 48,
      borderRadius: 8,
      paddingLeft: 25,
    },
    inputContainer: {
      width: '100%'
    },
    googleContainer: {
      height: 100,
      alignItems: 'center',
    },
    searchButton: {
      marginTop: 24,
      alignItems: 'center',
      marginBottom:24,
      padding: 20
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    listItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
    }
  });

export default GoogleMapWithSearch;
