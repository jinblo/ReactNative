import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';



export default function Map({ route, navigation }) {
  const { item } = route.params;
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

  const searchAddress = () => {
    fetch(`https://geocode.maps.co/search?q=${item.address}&api_key=${apikey}`)
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

  useEffect(() => { searchAddress() }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapstyle}
        region={region}
      >
        <Marker
          title={item.address}
          coordinate={coordinates}
        />
      </MapView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
