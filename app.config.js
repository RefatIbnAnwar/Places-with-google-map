import "dotenv/config";

export default {
  expo: {
    name: "places-with-google-map",
    slug: "places-with-google-map",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
      config: {
        googleMaps: {
          apiKey: process.env.API_KEY, // Load from .env
        },
      },
      "bundleIdentifier": "com.anonymous.placeswithgooglemap"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      config: {
        googleMaps: {
          apiKey: process.env.API_KEY, // Load from .env
        },
      },
      "package": "com.anonymous.placeswithgooglemap"
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      googleMapsApiKey: process.env.API_KEY, // Access it in the app
    },
  },
};
