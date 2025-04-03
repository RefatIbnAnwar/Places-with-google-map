import React, { useState, useEffect } from "react";
import { View, FlatList, Text, Button, StyleSheet, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PlaceListScreen = ({navigation}) => {
  const [placesList, setPlacesList] = useState([]);

  useEffect(() => {
    loadPlaces();
  }, []);

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

  const clearPlaces = async () => {
    await AsyncStorage.removeItem("places");
    setPlacesList([]); // Update UI
  };

  return (
    <View style={styles.container}>
      { placesList.length === 0 ? (
        <Text style={styles.emptyText}>No saved places</Text>
      ) : (
        <FlatList
          data={placesList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Pressable onPress={() => navigation.navigate("MapViewScreen", { place: item })}>            
                <View style={styles.listItem}>
                    <Text style={styles.placeName}>{item.name}</Text>
                </View>
            </Pressable>
          )}
        />
      )}
      <Button title="Clear Saved Places" onPress={clearPlaces} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  placeName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
  },
});

export default PlaceListScreen;
