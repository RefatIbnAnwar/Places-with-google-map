import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from "react-native-maps";


const MapViewScreen = ({ route }) => {
  const { place } = route.params;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
        initialRegion={{
          latitude: place.latitude,
          longitude: place.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={{ latitude: place.latitude, longitude: place.longitude }} title={place.name} />
      </MapView>
      <View style={styles.infoContainer}>
        <Text style={styles.placeName}>{place.name}</Text>
        <Text>Latitude: {place.latitude}</Text>
        <Text>Longitude: {place.longitude}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  infoContainer: {
    padding: 20,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  placeName: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
});

export default MapViewScreen;
