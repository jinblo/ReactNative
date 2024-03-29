import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
  const apikey = process.env.EXPO_PUBLIC_API_KEY
  const [coordinates, setCoordinates] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
  })
  const [region, setRegion] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221
  })
  const [address, setAddress] = useState('')

  const searchAddress = () => {
    fetch(`https://geocode.maps.co/search?q=${address}&api_key=${apikey}`)
      .then(response => {
        if (!response.ok)
          throw new Error("Error in fetch:" + response.statusText)
        return response.json()
      })
      .then(data => {
        setCoordinates({ latitude: parseFloat(data[0].lat), longitude: parseFloat(data[0].lon) })
        setRegion({ ...region, latitude: parseFloat(data[0].lat), longitude: parseFloat(data[0].lon) })
      })
      .catch(err => console.log(err))
  }

  const [location, setLocation] = useState(null)

  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert('No permission to get location')
      return;
    }

    let loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
    setLocation(loc)
    setRegion({ ...region, latitude: location.coords.latitude, longitude: location.coords.longitude })
    setCoordinates({ latitude: location.coords.latitude, longitude: location.coords.longitude })
  }

  useEffect(() => { getLocation() }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapstyle}
        region={region}
      >
        <Marker
          title={address}
          coordinate={coordinates}
        />
      </MapView>
      <View style={{ width: '100%', height: 80 }}>
        <TextInput
          style={{ height: 40 }}
          value={address}
          onChangeText={text => setAddress(text)}
          placeholder='Syötä osoite..'
        />
        <Button title='Show' onPress={searchAddress} />
      </View>
      <StatusBar style="auto" />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapstyle: {
    flex: 9,
    width: '100%',
    height: '100%',
  }
});
