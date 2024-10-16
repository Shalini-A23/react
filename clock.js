//app.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, Button, Modal } from 'react-native';

// DigitalClock Component
const DigitalClock = ({ textColor }) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
    setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
  }, 1000);

    return () => clearInterval(timer); // Clear the interval when the component unmounts
  }, []);

  return (
    <View style={styles.clockContainer}>
      <Text style={[styles.timeText, { color: textColor }]}>{time}</Text>
    </View>
  );
};

// TimerModal Component
const TimerModal = ({ isVisible, onClose, duration, onStart }) => {
  const [seconds, setSeconds] = useState(duration);
  const [timerRunning, setTimerRunning] = useState(false);

  const startTimer = () => {
    onStart();
    setSeconds(duration);
    setTimerRunning(true);

    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          alert("Timer is Over!");
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const restartTimer = () => {
    setSeconds(duration); // Reset seconds to initial duration
    startTimer(); // Restart the timer
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.title}>Timer</Text>
        <Text style={styles.timerText}>{seconds} seconds remaining</Text>

        {timerRunning ? (
          <>
            <Button title="Restart Timer" onPress={restartTimer} />
            <Button title="Close" onPress={onClose} />
          </>
        ) : (
          <Button title="Start Timer" onPress={startTimer} />
        )}
      </View>
    </Modal>
  );
};

// Main App Component
export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const themeStyles = isDarkMode ? styles.dark : styles.light;
  const textColor = isDarkMode ? '#fff' : '#000'; // Change text color based on dark mode

  return (
    <View style={[styles.container, themeStyles]}>
      <DigitalClock textColor={textColor} /> {/* Pass the textColor to the clock */}
      <View style={styles.switchContainer}>
        <Text style={[themeStyles.text, styles.text]}>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>
      <Button title="Open Timer" onPress={() => setIsModalVisible(true)} />

      <TimerModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        duration={10} // 10 seconds for demo
        onStart={() => console.log('Timer started')}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  light: {
    backgroundColor: '#fff',
  },
  dark: {
    backgroundColor: '#333',
  },
  text: {
    fontSize: 18,
    marginRight: 10,
  },
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  clockContainer: {
    marginBottom: 40,
  },
  timeText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  timerText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
