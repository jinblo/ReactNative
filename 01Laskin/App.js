import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

export default function App() {
  const [result, setResult] = useState(0);
  const [luku1, setLuku1] = useState(0);
  const [luku2, setLuku2] = useState(0);

  const pluslasku = () => {
    setResult(luku1 + luku2)
  }

  const miinuslasku = () => {
    setResult(luku1 - luku2)
  }

  return (
    <View style={styles.container}>
      <View>
        <Text>Result: {result}</Text>
        <TextInput style={styles.input} keyboardType='numeric' onChangeText={text => setLuku1(parseFloat(text))} />
        <TextInput style={styles.input} keyboardType='numeric' onChangeText={text => setLuku2(parseFloat(text))} />
        <StatusBar style="auto" />
      </View>
      <View style={{ flexDirection: 'row', margin: 20 }}>
        <View style={{margin: 10}}>
          <Button title="+" onPress={pluslasku} />
        </View>
        <View style={{margin: 10}}>
          <Button title="-" onPress={miinuslasku} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    width: 100, 
    borderColor: 'gray', 
    borderWidth: 1,
  },
});
