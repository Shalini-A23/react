//app.js
import React from 'react';
import StackNavigator from './navigation/StackNavigator';
export default function App() {
  return <StackNavigator />;
}
//navigation/StackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import ResultScreen from '../screens/ResultScreen';
const Stack = createStackNavigator();
const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default StackNavigator;
//Screens/HomeScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [temperature, setTemperature] = useState('');
  const [unit, setUnit] = useState('Celsius');
  
  const convertTemperature = () => {
    let convertedTemp;
    if (unit === 'Celsius') {
      convertedTemp = (parseFloat(temperature) * 9/5) + 32; // Convert to Fahrenheit
    } else {
      convertedTemp = (parseFloat(temperature) - 32) * 5/9; // Convert to Celsius
    }
    navigation.navigate('Result', { convertedTemp: convertedTemp.toFixed(2), unit });
  };
  
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Temperature Converter</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter temperature"
          keyboardType="numeric"
          value={temperature}
          onChangeText={setTemperature}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Celsius to Fahrenheit" onPress={() => setUnit('Celsius')} />
          </View>
          <View style={styles.button}>
            <Button title="Fahrenheit to Celsius" onPress={() => setUnit('Fahrenheit')} />
          </View>
        </View>
        <Button title="Convert" onPress={convertTemperature} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',  // Centers content vertically
    alignItems: 'center',       // Centers content horizontally
    backgroundColor: '#ff7e5f', // Set background color
  },
  container: {
    width: '80%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,  // Adds some space below the input field
    paddingHorizontal: 10,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,  // Adds space between the buttons and the Convert button
  },
  button: {
    flex: 1,  // Makes the buttons take equal space
    marginHorizontal: 5,  // Adds space between the two buttons
  },
});

export default HomeScreen;
//Screens/ResultScreen.js
import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';

const ResultScreen = ({ route, navigation }) => {
  const { convertedTemp, unit } = route.params;
  
  const showAlert = () => {
    Alert.alert(
      'Conversion Result',
      `The converted temperature is ${convertedTemp} degrees in ${unit === 'Celsius' ? 'Fahrenheit' : 'Celsius'}.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>
        The converted temperature is {convertedTemp} degrees in {unit === 'Celsius' ? 'Fahrenheit' : 'Celsius'}.
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Home" onPress={() => navigation.navigate('Home')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  buttonContainer: {
    width: '60%',
    marginTop: 20,
  },
});

export default ResultScreen;
