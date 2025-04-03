# Google Map with AsyncStorage

A React Native app that allows users to search for locations, view them on a Google Map, and store the latitude, longitude, and name of places in AsyncStorage. The app also allows users to view a list of previously searched places and navigate to each one on the map.

## Table of Contents

- [Google Map with AsyncStorage](#google-map-with-asyncstorage)
- [Installation](#installation)
- [Requirements](#requirements)
- [Usage](#usage)
- [Features](#features)
- [Dependencies](#dependencies)
- [Screenshot](#Screenshot)
- [Screenshot](#Contact)

## Installation

### Prerequisites

- **Node.js** (version 14 or higher) installed on your machine.
- **Expo CLI** installed globally:
  ```bash
  npm install -g expo-cli
  ```
- **Xcode**
- **Android Studio**
- **Expo go**

### Steps

1. Clone the repository

```bash
  git clone git@github.com:RefatIbnAnwar/Places-with-google-map.git
  cd Places-with-google-map
```

2. Install dependencies:

```bash
    npm install
```

3. Install Expo Dev Client: To enable custom native modules

```bash
    npx expo install expo-dev-client
    npx expo prebuild
    npx expo run:ios
```

4. Open your ios folder in Xcode
5. Open Podfile in the ios directory.
6. Add following pods

```bash
    pod 'GoogleMaps'
    pod 'Google-Maps-iOS-Utils'
    pod 'react-native-maps', path: '../node_modules/react-native-maps'
```

7. Install the dependencies

```bash
    cd ios
    pod install
    cd ..
```

8. Set up Google Maps API Key in AppDelegate.m: Open ios/YourProject/AppDelegate.m and import the Google Maps SDK:

```base
    #import <GoogleMaps/GoogleMaps.h>
```

Then, in didFinishLaunchingWithOptions, add:

```base
[GMSServices provideAPIKey:@"YOUR_GOOGLE_MAPS_API_KEY"];
```

9. Ensure Permissions are added in Info.plist for location services: Add these entries to ios/YourProject/Info.plist:

```
<key>NSLocationWhenInUseUsageDescription</key>
<string>Your message to the user when asking for location permissions</string>
<key>NSLocationAlwaysUsageDescription</key>
<string>Your message to the user when asking for location permissions</string>
```

10. (Android) run the expo server by this command

```
npm start
```

Type s to change into expo go or
Type a to start emulator or scan the QR with your android device.

11. (iOS) run the expo server by this command

```
npm start
```

Type s to change into expo go or
Type i to start simulator or scan the QR with your iOS device. and If that does not work
run this command

```
npx react-native run-ios
```

## Requirements

Before running the app, ensure you have:

- Google Maps API Key from Google Cloud Console.

## Usage

1. Search and Save Location:

- Enter the name or address of a place.

- Click "Search" to display the place on the map and save the location details (latitude, longitude, and name) to AsyncStorage.

2. View Saved Places:

- Click the "View Saved Places" button to see a list of all places stored in AsyncStorage.

- Press each list item to view that location on the map.

3. Map View:

- The map will show the selected place with a marker and the place's name.

## Features

- Search for locations via Google Maps API.
- AutoComplete using Google Places API
- Save place details (latitude, longitude, name) in AsyncStorage.
- View list of saved places with the option to navigate to a specific place on the map.
- Map Integration using Google Maps via react-native-maps.

## Dependencies

- react-native-maps: For integrating Google Maps.

- @react-native-async-storage/async-storage: For storing and retrieving data locally.

- expo: Core Expo SDK for building and running the app.

- expo-dev-client: To create custom development builds for native modules.

## Screenshot

![Google map view](Places-with-google-map/screenshots/1.jpeg)
![Auto complete](Places-with-google-map/screenshots/2.jpeg)
![Search button clicked](Places-with-google-map/screenshots/3.jpeg)
![Searched Places](Places-with-google-map/screenshots/4.jpeg)
![Map View](Places-with-google-map/screenshots/5.jpeg)

## Contact

For questions or feedback, feel free to reach out:

- **Email**: refatibnanwar@gmail.com
- **GitHub**: [@RefatIbnAnwar](https://github.com/RefatIbnAnwar)
