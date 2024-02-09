import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [keyword, setKeyword] = useState('')
  const [recipes, setRecipes] = useState([])

  const fetchRecipes = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
      .then(response => response.json())
      .then(data => setRecipes(data.meals))
      .catch(err => console.error(err))
  }

  const itemSeparator = () => {
    return (<View style={{ height: 1, backgroundColor: 'black' }} ></View>)
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 6, alignItems: 'stretch', marginTop: 50 }}>
        <FlatList
          data={recipes}
          ItemSeparatorComponent={itemSeparator}
          renderItem={({ item }) =>
            <View style={{ margin: 10 }}>
              <Text>{item.strMeal}</Text>
              <Image style={{ width: 100, height: 100 }} source={{ uri: `${item.strMealThumb}` }} />
            </View>
          }
        />
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <TextInput
          style={styles.input}
          value={keyword}
          onChangeText={text => setKeyword(text)}
          placeholder='Search..'
        />
        <Button
          title='Find'
          onPress={fetchRecipes}
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
    justifyContent: 'center',
    padding: 10
  },
  input: {
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5,
    padding: 2
  },
});
