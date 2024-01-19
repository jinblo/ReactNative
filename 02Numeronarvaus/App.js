import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';

export default function App() {
  const [target, setTarget] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState(0);
  const [text, setText] = useState("Guess a number between 1-100");
  const [guesses, setGuesses] = useState(1)

  const compare = () => {
    if (guess<target) {
      setText(`Your guess ${guess} is too low`)
      setGuesses(guesses+1)
    } else if (guess>target) {
      setText(`Your guess ${guess} is too high`)
      setGuesses(guesses+1)
    } else {
      Alert.alert(`You guessed the number in ${guesses} guesses`)
    }
  }


  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <View style={{ margin: 20 }}>
        <TextInput style={styles.input} keyboardType='numeric' onChangeText={text => setGuess(parseFloat(text))} />
      </View>
      <View style={{ margin: 20 }}>
        <Button title="make guess" onPress={compare} />
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
    justifyContent: 'center'
  },
  input: {
    width: 50, 
    borderColor: 'gray', 
    borderWidth: 1,
  },
});
