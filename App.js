import { StatusBar } from 'expo-status-bar';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import GoogleMapWithSearch from './GoogleMapWithSearch';
import PlaceListScreen from './PlaceListScreen';
import MapViewScreen from './MapViewScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="GoogleMap" component={GoogleMapWithSearch} options={{ title: "Google Map" }} />
        <Stack.Screen name="PlacesList" component={PlaceListScreen} options={{ title: "Searched Places" }} />
        <Stack.Screen name="MapViewScreen" component={MapViewScreen} options={{ title: "Place on Map" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}