//app.js
import React from 'react';
import StackNavigator from './navigation/StackNavigator';
export default function App() {
  return <StackNavigator />;
}
//screens/HomeScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';
const HomeScreen = ({ navigation }) => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const calculateBMI = () => {
    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    const bmi = weightInKg / (heightInMeters * heightInMeters);
    navigation.navigate('Result', { bmi: bmi.toFixed(2) });
  };
  return (
    <ImageBackground source={{ uri: 'https://your-image-url.jpg' }} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>BMI Calculator</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your height (cm)"
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your weight (kg)"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
        <Button title="Calculate BMI" onPress={calculateBMI} />
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
});
export default HomeScreen;
//Screens/ResultScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
const ResultScreen = ({ route, navigation }) => {
  const { bmi } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>Your BMI is: {bmi}</Text>
      <Button title="Back to Calculator" onPress={() => navigation.goBack()} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
export default ResultScreen;
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
