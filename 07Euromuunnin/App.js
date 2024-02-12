import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker'

export default function App() {
  const [data, setData] = useState({})
  const [amount, setAmount] = useState(0)
  const [currency, setCurrency] = useState('')
  const [convertedAmount, setConvertedAmount] = useState(0)
  const apiKey = process.env.EXPO_PUBLIC_API_KEY

  var myHeaders = new Headers();
  myHeaders.append("apikey", apiKey);

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };

  const fetchExhangeRates = () => {
    fetch('https://api.apilayer.com/exchangerates_data/latest', requestOptions)
      .then(response => response.json())
      .then(data => setData(data.rates))
      .catch(err => console.error(err))
  }

  useEffect(fetchExhangeRates, [])

  const convertValues = () => {
    console.log(currency)
    console.log(data[currency])
    setConvertedAmount(amount * data[currency])
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 4, marginTop: 100, justifyContent: 'flex-end', alignItems: 'center' }}>
        <Image style={{ width: 250, height: 138 }} source={{ uri: 'https://cdn.pixabay.com/photo/2013/07/12/15/34/euro-150091_1280.png' }} />
        <Text
          style={{ fontSize: 20 }}>
          {convertedAmount.toFixed(2)} €
        </Text>
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <TextInput
          style={{ width: 150 }}
          value={amount}
          keyboardType='numeric'
          onChangeText={num => setAmount(parseFloat(num))}
          placeholder='Search..'
        />
        <Picker
          style={{ width: 150 }}
          mode='dropdown'
          selectedValue={currency}
          onValueChange={itemValue =>
            setCurrency(itemValue)
          }>
          {Object.keys(data).map((val, id) =>
            <Picker.Item key={id} label={val} value={val} />)
          }
        </Picker>
      </View>
      <View style={{ flex: 4 }}>
        <Button title='Convert' onPress={convertValues} />
      </View>
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
});
