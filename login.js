//app.js
// App.js
import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import LoginForm from './components/LoginForm';

export default function App() {
  return (
    <ImageBackground
      source={require('./assets/back.jpg')}  // Local image from assets
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.formContainer}>
          <LoginForm />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Semi-transparent overlay
    width: '100%',
  },
  formContainer: {
    width: '90%',
    maxWidth: 400,  // Ensures that the form doesn't get too wide on larger screens
    padding: 16,
  },
});

//components/LoginForm.js
// components/LoginForm.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle login validation
  const handleLogin = () => {
    if (!email || !password) {
      setErrorMessage('Both fields are required.');
    } else if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email.');
    } else if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
    } else {
      setErrorMessage('');
      alert(`Login successful! Welcome ${email}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      
      {/* Error message display */}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',  // Light white background
    borderRadius: 10,
    width: '85%',  // Slightly narrower to look neat
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});
