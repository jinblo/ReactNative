import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {
  const [text, setText] = useState('');

  const speak = () => {
    Speech.speak(text)
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={{ width: 300, borderColor: 'black', borderWidth: 1, padding: 10, margin: 10 }}
        onChangeText={text => setText(text)}
      />
      <Button title='Press to hear text' onPress={speak} />
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
