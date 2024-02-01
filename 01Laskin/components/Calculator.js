import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

export default function Calculator({ route, navigation }) {
  const [result, setResult] = useState(0);
  const [luku1, setLuku1] = useState(0);
  const [luku2, setLuku2] = useState(0);
  const [data, setData] = useState([]);

  const pluslasku = () => {
    let sum = luku1 + luku2
    setResult(sum)
    setData([...data, { key: `${luku1} + ${luku2} = ${sum}` }])
    setLuku1('')
    setLuku2('')
  }

  const miinuslasku = () => {
    let sub = luku1 - luku2
    setResult(sub)
    setData([...data, { key: `${luku1} - ${luku2} = ${sub}` }])
    setLuku1('')
    setLuku2('')
  }

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        onChangeText={text => setLuku1(parseFloat(text))}
        value={String(luku1)}
      />
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        onChangeText={text => setLuku2(parseFloat(text))}
        value={String(luku2)}
      />
      <View style={styles.buttonContainer}>
        <Button title=" + " onPress={pluslasku} />
        <Button title=" - " onPress={miinuslasku} />
        <Button
          title="History"
          onPress={() => navigation.navigate('History', { data })} />
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
    marginTop: 100,
  },
  input: {
    width: 100,
    borderColor: 'gray',
    borderWidth: 1,
  },
  buttonContainer: {
    flex: 2,
    width: 200,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    padding: 10,
  },
});
