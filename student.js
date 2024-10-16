//app.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StudentFormScreen from './screens/StudentFormScreen';
import StudentDetailsScreen from './screens/StudentDetailsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StudentForm">
        <Stack.Screen name="StudentForm" component={StudentFormScreen} />
        <Stack.Screen name="StudentDetails" component={StudentDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//screens/StudentFormScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Picker, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const StudentFormScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('1');
  const [branch, setBranch] = useState('Computer Science');
  const [registerNumber, setRegisterNumber] = useState('');
  const [formError, setFormError] = useState('');
  const [buttonPressed, setButtonPressed] = useState(false);

  const handleSubmit = () => {
    // Validation
    if (!name || !age || !registerNumber) {
      setFormError('All fields are required!');
      return;
    }

    if (isNaN(age)) {
      setFormError('Age must be a number!');
      return;
    }

    // Navigate to details screen with form data
    navigation.navigate('StudentDetails', { name, age, yearOfStudy, branch, registerNumber });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Student Form</Text>
      {formError ? <Text style={styles.error}>{formError}</Text> : null}

      <Text>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter name"
      />

      <Text>Age</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        placeholder="Enter age"
      />

      <Text>Year of Study</Text>
      <Picker
        selectedValue={yearOfStudy}
        style={styles.input}
        onValueChange={(itemValue) => setYearOfStudy(itemValue)}
      >
        <Picker.Item label="1st Year" value="1" />
        <Picker.Item label="2nd Year" value="2" />
        <Picker.Item label="3rd Year" value="3" />
        <Picker.Item label="4th Year" value="4" />
      </Picker>

      <Text>Branch</Text>
      <Picker
        selectedValue={branch}
        style={styles.input}
        onValueChange={(itemValue) => setBranch(itemValue)}
      >
        <Picker.Item label="Computer Science" value="Computer Science" />
        <Picker.Item label="Mechanical Engineering" value="Mechanical Engineering" />
        <Picker.Item label="Electrical Engineering" value="Electrical Engineering" />
        <Picker.Item label="Civil Engineering" value="Civil Engineering" />
        <Picker.Item label="Biotechnology" value="Biotechnology" />
      </Picker>

      <Text>Register Number</Text>
      <TextInput
        style={styles.input}
        value={registerNumber}
        onChangeText={setRegisterNumber}
        placeholder="Enter register number"
      />

      <TouchableOpacity
        style={[styles.button, buttonPressed ? { opacity: 0.5 } : null]}
        onPressIn={() => setButtonPressed(true)}
        onPressOut={() => setButtonPressed(false)}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 10 },
  error: { color: 'red' },
  button: { backgroundColor: '#1E90FF', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontSize: 16 },
});

export default StudentFormScreen;

//screens/StudentDetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StudentDetailsScreen = ({ route }) => {
  const { name, age, yearOfStudy, branch, registerNumber } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Student Details</Text>
      <Text>Name: {name}</Text>
      <Text>Age: {age}</Text>
      <Text>Year of Study: {yearOfStudy}</Text>
      <Text>Branch: {branch}</Text>
      <Text>Register Number: {registerNumber}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});

export default StudentDetailsScreen;
