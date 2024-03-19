import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';
import { useState } from 'react';

export default function App() {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers]
      });
      if (data.length > 0) {
        setContacts(data);
      }
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={({ item }) => <View style={{ flexDirection: 'row' }}>
          <Text>{item.name} {item.phoneNumbers[0].number}</Text>
        </View>}
      />
      <Button title='Get contact' onPress={getContacts} />
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
    marginBottom: 10,
    marginTop: 50,
  },
});
