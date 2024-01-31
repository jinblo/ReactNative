import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, FlatList, Dimensions } from 'react-native';

export default function App() {
  const [result, setResult] = useState(0);
  const [luku1, setLuku1] = useState(0);
  const [luku2, setLuku2] = useState(0);
  const [data, setData] = useState([]);

  const pluslasku = () => {
    setResult(luku1 + luku2)
    setData([...data, { key: `${luku1} + ${luku2} = ${luku1 + luku2}` }])
  }

  const miinuslasku = () => {
    setResult(luku1 - luku2)
    setData([...data, { key: `${luku1} - ${luku2} = ${luku1 - luku2}` }])
  }

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <TextInput style={styles.input} keyboardType='numeric' onChangeText={text => setLuku1(parseFloat(text))} />
      <TextInput style={styles.input} keyboardType='numeric' onChangeText={text => setLuku2(parseFloat(text))} />
      <View style={styles.buttonContainer}>
        <Button title=" + " onPress={pluslasku} />
        <Button title=" - " onPress={miinuslasku} />
      </View>
      <View style={styles.list}>
        <Text>History</Text>
        <FlatList
          data={data}
          renderItem={({ item }) =>
            <Text>{item.key}</Text>
          }
          keyExtractor={(item, index) => index.toString()}
        />
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
    width: 100,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    padding: 10,
  },
  list: {
    flex: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  }
});
