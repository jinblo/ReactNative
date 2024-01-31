import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';

export default function App() {
  const [text, setText] = useState('');
  const [list, setList] = useState([]);

  const addToList = () => {
    setList([...list, { key: text }]);
    setText('');
  }

  const clearList = () => {
    setList([]);
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} onChangeText={text => setText(text)} value={text} />
      <View style={styles.buttonContainer}>
        <Button onPress={addToList} title="Add" />
        <Button onPress={clearList} title="Clear" />
      </View>
      <Text style={{ color: '#3366FF', fontWeight: 'bold' }}>Shopping List</Text>
      <FlatList style={styles.list}
        data={list}
        renderItem={({ item }) =>
          <View style={styles.listContainer}>
            <Text>{item.key}</Text>
          </View>
        }
        keyExtractor={(item, index) => index.toString()}
      />
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
    marginTop: 50,
  },
  input: {
    marginTop: 50,
    marginBottom: 5,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1
  },
  buttonContainer: {
    flex: 1,
    width: 200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  listContainer: {
    flex: 1,
    alignItems: 'center',
  }
});