//app.js + navigation
import * as React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import ResultScreen from './screens/ResultScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const dynamicStyles = StyleSheet.create({
    header: {
      backgroundColor: isDarkMode ? '#333' : '#f8f8f8',
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#000',
    },
  });

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <View style={dynamicStyles.header}>
        <Text style={dynamicStyles.headerText}>Movies and TV Shows</Text>
        <Button title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`} onPress={toggleTheme} />
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: isDarkMode ? '#333' : '#fff' },
          tabBarLabelStyle: { fontSize: 14, color: isDarkMode ? '#fff' : '#000' },
          tabBarIconStyle: { size: 24 },
        }}
      >
        <Tab.Screen
          name="Movies"
          component={(props) => <HomeScreen {...props} theme={isDarkMode ? 'dark' : 'light'} />}
          options={{
            tabBarLabel: 'Movies',
          }}
        />
        <Tab.Screen
          name="TV Shows"
          component={(props) => <ResultScreen {...props} theme={isDarkMode ? 'dark' : 'light'} />}
          options={{
            tabBarLabel: 'TV Shows',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

//screens/HomeScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const movies = [
  'Inception',
  'The Dark Knight',
  'Interstellar',
  'Titanic',
  'Avatar',
  'The Matrix',
  'Avengers: Endgame',
  'The Godfather',
];

export default function HomeScreen({ theme }) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme === 'dark' ? '#333' : '#fff',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color: theme === 'dark' ? '#fff' : '#000', // Dynamic header color
    },
    item: {
      fontSize: 18,
      paddingVertical: 5,
      color: theme === 'dark' ? '#fff' : '#000', // Dynamic item color
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Popular Movies</Text>
      <FlatList
        data={movies}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
        keyExtractor={(item) => item}
      />
    </View>
  );
}

//screens/ResultScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const tvShows = [
  'Breaking Bad',
  'Game of Thrones',
  'Stranger Things',
  'Friends',
  'The Office',
  'Narcos',
  'The Crown',
  'Black Mirror',
];

export default function ResultScreen({ theme }) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme === 'dark' ? '#333' : '#fff',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color: theme === 'dark' ? '#fff' : '#000', // Dynamic header color
    },
    item: {
      fontSize: 18,
      paddingVertical: 5,
      color: theme === 'dark' ? '#fff' : '#000', // Dynamic item color
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorite TV Shows</Text>
      <FlatList
        data={tvShows}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
        keyExtractor={(item) => item}
      />
    </View>
  );
}
