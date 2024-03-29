import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Icon, Input, ListItem } from '@rneui/themed';
import { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('addressdb.db');

export default function Addresses({ route, navigation }) {
  const [newAddress, setNewAddress] = useState('');
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists address (id integer primary key not null, address text);');
    }, () => console.error("Error when creating DB"), updateList);
  }, []);

  const saveAddress = () => {
    if (newAddress) {
      db.transaction(tx => {
        tx.executeSql('insert into address (address) values (?);', [newAddress]);
      }, () => console.error("Error in Insert"), updateList
      )
    }
    else {
      Alert.alert('Error', 'Type address first');
    }
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from address;', [], (_, { rows }) =>
        setAddresses(rows._array)
      );
      setNewAddress('');
    });
  }

  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from address where id = ?;`, [id]);
      }, null, updateList
    )
  }

  return (
    <View style={styles.container}>
      <View style={{ width: '85%', marginTop: 10 }} >
        <Input
          label='PLACEFINDER'
          placeholder='Type in address'
          onChangeText={text => setNewAddress(text)}
          value={newAddress}
        />
        <Button
          color='grey'
          size='lg'
          onPress={saveAddress} >
          <Icon name="save" color="white" style={{ marginRight: 10 }} />
          SAVE
        </Button>
      </View>
      <FlatList
        style={{ width: '100%' }}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) =>
          <ListItem
            bottomDivider
            onLongPress={() => deleteItem(item.id)}
            onPress={() => navigation.navigate('Map', { item })}
          >
            <ListItem.Content>
              <ListItem.Title>{item.address}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content style={{ alignItems: 'flex-end' }}>
              <ListItem.Subtitle style={{ color: 'grey' }} >show on map</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron color='#9e9e9e' size={30} />
          </ListItem>
        }
        data={addresses}
      />
      <StatusBar style="auto" />
    </View>
  )


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  }
});