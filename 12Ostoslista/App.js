import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, push, ref, remove } from "firebase/database";
import { useEffect, useState } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyC6j7WjH_Vi2c8GFht4NtDjrRahBmhdfl8",
  authDomain: "shoppinglist-72aec.firebaseapp.com",
  databaseURL: "https://shoppinglist-72aec-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "shoppinglist-72aec",
  storageBucket: "shoppinglist-72aec.appspot.com",
  messagingSenderId: "500134084153",
  appId: "1:500134084153:web:8945b08ecd3db619f3d7e8"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function App() {
  const [product, setProduct] = useState({
    title: '',
    amount: ''
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    onValue(ref(database, '/products'), (snapshot) => {
      const data = snapshot.val()
      setProducts(Object.entries(data))
    })
  }, []);

  const handleSave = () => {
    push(ref(database, '/products'), product);
    setProduct({
      title: '',
      amount: ''
    })
  };

  const handleDelete = (id) => {
    remove(ref(database, `/products/${id}`))
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='product title'
        value={product.title}
        onChangeText={val => setProduct({ ...product, title: val })}
      />
      <TextInput
        placeholder='amount'
        value={product.amount}
        onChangeText={val => setProduct({ ...product, amount: val })}
      />
      <Button title="Save" onPress={handleSave} />
      <FlatList
        data={products}
        renderItem={({ item }) => <View style={{ flexDirection: 'row' }}>
          <Text>{item[1].title} {item[1].amount} </Text>
          <Text style={{ color: '#0000ff' }} onPress={() => handleDelete(item[0])}> delete</Text>
        </View>}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
