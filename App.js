import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { API_KEY } from '@env';

export default function App() {

  const [isFocused, setIsFocused] = useState(false);
  console.log(API_KEY)

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
            console.log(data, details);
          }}
          query={{
            key: API_KEY,
            language: 'en',
          }}
          styles={{
            textInput: isFocused ? styles.textInputFocused : styles.textInput,
            container: styles.inputContainer
          }}

          // textInputProps= {{
          //   onfocus: ()=> setIsFocused(true),
          //   onBlur: ()=> setIsFocused(false)
          // }}
          textInputProps={
            {
              onFocus: ()=> setIsFocused(true),
              onblur: ()=> setIsFocused(false)
            }
          }
        />
      </View>
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
    flex: 1,
    alignItems: 'center'
  }
});
