import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';

// SQLite DB
const db = SQLite.openDatabase('shoppinglist.db');

export default function App() {
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [list, setList] = useState([]);

  // update shopping list
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from productsToBuy;', [], (_, { rows }) =>
        setList(rows._array)
      );
    }, null, null);
    setProduct('')
    setAmount('')
  }

  // save new row into database
  const saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into productsToBuy (product, amount) values (?,?);', [product, amount]);
    }, null, updateList)
  }

  // delete item from database
  const deleteItem = (id) => {
    db.transaction(tx => {
      tx.executeSql('delete from productsToBuy where id = ?;', [id]);
    }, null, updateList)
  }

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists productsToBuy (id integer primary key not null, product text, amount text);');
    }, () => console.error('Error when creating database'), updateList)
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Product'
          onChangeText={text => setProduct(text)}
          value={product} />
        <TextInput
          style={styles.input}
          placeholder='Amount'
          onChangeText={text => setAmount(text)}
          value={amount} />
        <Button onPress={saveItem} title="Save" />
      </View>
      <Text style={{ color: '#3366FF', fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>Shopping List</Text>
      <FlatList
        style={styles.list}
        data={list}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) =>
          <View style={styles.listContainer}>
            <Text style={{ fontSize: 18 }}>{item.product}, {item.amount} </Text>
            <Text style={{ color: '#0000ff' }} onPress={() => deleteItem(item.id)}>bought</Text>
          </View>
        }
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
    marginTop: 100,
  },
  input: {
    marginBottom: 5,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1
  },
  inputContainer: {
    flex: 1,
    width: 200,
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});