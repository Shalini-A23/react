//app.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';

export default function App() {
  const [timeLeft, setTimeLeft] = useState(10); // Countdown starting at 10
  const [running, setRunning] = useState(false); // To control if the timer is running
  const [theme, setTheme] = useState('light'); // Theme state: 'light' or 'dark'

  // Toggle theme between light and dark
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Start the countdown
  const startCountdown = () => {
    if (!running) {
      setRunning(true);
    }
  };

  // Pause the countdown
  const pauseCountdown = () => {
    setRunning(false);
  };

  // Reset the countdown to 10
  const resetCountdown = () => {
    setTimeLeft(10);
    setRunning(false);
  };

  // Use effect to handle countdown logic
  useEffect(() => {
    let timer;
    if (running && timeLeft > 0) {
      // Start countdown interval
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Trigger alert when countdown reaches 0
      if (typeof window !== 'undefined') {
        window.alert('Time is up! The countdown has finished.');
      } else {
        Alert.alert('Time is up!', 'The countdown has finished.');
      }
      setRunning(false); // Stop the countdown after alert
    }

    return () => clearInterval(timer); // Clean up the timer on component unmount
  }, [running, timeLeft]);

  // Define themes
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
      <Text style={[styles.timerText, { color: currentTheme.textColor }]}>
        {timeLeft}
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          title={running ? 'Pause' : 'Start'}
          onPress={running ? pauseCountdown : startCountdown}
          color={currentTheme.buttonColor}
        />
        <Button title="Reset" onPress={resetCountdown} color={currentTheme.buttonColor} />
      </View>

      <Button title="Toggle Theme" onPress={toggleTheme} color={currentTheme.buttonColor} />
    </SafeAreaView>
  );
}

// Light theme styles
const lightTheme = {
  backgroundColor: '#ffffff',
  textColor: '#000000',
  buttonColor: '#1E90FF',
};

// Dark theme styles
const darkTheme = {
  backgroundColor: '#333333',
  textColor: '#ffffff',
  buttonColor: '#FF6347',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  timerText: {
    fontSize: 60,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginBottom: 20,
  },
});
