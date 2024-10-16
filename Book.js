//app.js
// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './navigation/StackNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
}

//navigation/StackNavigator.js
// navigation/StackNavigation.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ResultScreen from '../screens/ResultScreen';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Enter Book Details' }}
      />
      <Stack.Screen
        name="Result"
        component={ResultScreen}
        options={{ title: 'Book Details' }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;

//screens/HomeScreen.js
// screens/HomeScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Animated, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [scale] = useState(new Animated.Value(1));
  const [opacity] = useState(new Animated.Value(1));

  const handleSubmit = () => {
    navigation.navigate('Result', { title, author, genre });
  };

  // Scale animation when the button is pressed
  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1.1, // Slightly scale up the button
        friction: 3,
        useNativeDriver: true,
      }).start(),
      Animated.timing(opacity, {
        toValue: 0.7, // Slightly reduce opacity on press
        duration: 100,
        useNativeDriver: true,
      }).start(),
    ]);
  };

  // Reset scale and opacity when the button is released
  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1, // Reset scale to normal size
        friction: 3,
        useNativeDriver: true,
      }).start(),
      Animated.timing(opacity, {
        toValue: 1, // Reset opacity to full
        duration: 100,
        useNativeDriver: true,
      }).start(),
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Details</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Book Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Author"
        value={author}
        onChangeText={setAuthor}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Genre"
        value={genre}
        onChangeText={setGenre}
      />

      <Animated.View style={{ transform: [{ scale }], opacity }}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;

//screens/ResultScreen.js
// screens/ResultScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ResultScreen = ({ route, navigation }) => {
  const { title, author, genre } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Details</Text>
      <Text style={styles.detail}>Title: {title}</Text>
      <Text style={styles.detail}>Author: {author}</Text>
      <Text style={styles.detail}>Genre: {genre}</Text>
      
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  detail: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ResultScreen;
