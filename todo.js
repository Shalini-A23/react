//app.js
import React, { useState } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, SafeAreaView } from 'react-native';
import TaskList from './components/TaskList';
import TaskInput from './components/TaskInput';
import TaskCategory from './components/TaskCategory';
import ThemeProvider, { useTheme } from './components/ThemeProvider';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [category, setCategory] = useState('All');

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = category === 'All' ? tasks : tasks.filter(task => task.category === category);

  return (
    <ThemeProvider>
      <ThemeWrapper>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TaskCategory setCategory={setCategory} />
            <ThemeToggleButton />
          </View>
          <TaskInput addTask={addTask} />
          <ScrollView style={styles.scrollView}>
            <TaskList tasks={filteredTasks} deleteTask={deleteTask} toggleComplete={toggleComplete} />
          </ScrollView>
        </SafeAreaView>
      </ThemeWrapper>
    </ThemeProvider>
  );
}

const ThemeWrapper = ({ children }) => {
  const { currentTheme } = useTheme();
  return (
    <View style={[styles.wrapper, { backgroundColor: currentTheme.backgroundColor }]}>
      {children}
    </View>
  );
};

const ThemeToggleButton = () => {
  const { toggleTheme } = useTheme();
  return (
    <Button title="Toggle Theme" onPress={toggleTheme} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    width: '100%',
    height: '100vh',
    padding: 20,
  },
});

//components/TaskInput.js
import React, { useState } from 'react';
import { TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from './ThemeProvider';

export default function TaskInput({ addTask }) {
  const [taskName, setTaskName] = useState('');
  const { currentTheme } = useTheme();

  const handleAddTask = () => {
    if (taskName.trim()) {
      addTask({ name: taskName, category: 'General' });
      setTaskName('');
    }
  };

  return (
    <>
      <TextInput
        style={[styles.input, { backgroundColor: currentTheme.inputBackgroundColor, color: currentTheme.textColor }]}
        placeholder="Enter task"
        placeholderTextColor={currentTheme.textColor}
        value={taskName}
        onChangeText={setTaskName}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: currentTheme.buttonColor }]}
        onPress={handleAddTask}
      >
        <Text style={[styles.buttonText, { color: currentTheme.textColor }]}>
          Add Task
        </Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

//components/TaskList.js
// components/TaskList.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useTheme } from './ThemeProvider';

export default function TaskList({ tasks, deleteTask, toggleComplete }) {
  const { currentTheme } = useTheme();

  return (
    <View>
      {tasks.map((task) => (
        <View key={task.id} style={[styles.task, { backgroundColor: currentTheme.inputBackgroundColor }]}>
          <Text
            style={[
              styles.taskText,
              { color: currentTheme.textColor },
              task.completed && styles.completed,
            ]}
          >
            {task.name}
          </Text>
          <Button title="Delete" onPress={() => deleteTask(task.id)} color={currentTheme.buttonColor} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  taskText: {
    fontSize: 16,
  },
  completed: {
    textDecorationLine: 'line-through',
  },
});

//components/TaskCategory.js
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function TaskCategory({ setCategory }) {
  return (
    <View style={styles.categoryContainer}>
      <Button title="All" onPress={() => setCategory('All')} />
      <Button title="General" onPress={() => setCategory('General')} />
      <Button title="Work" onPress={() => setCategory('Work')} />
      <Button title="Personal" onPress={() => setCategory('Personal')} />
    </View>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
});

//components/ThemeProvider.js
// components/ThemeProvider.js
import React, { createContext, useContext, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

// Create a Context for the theme
const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const lightTheme = {
  backgroundColor: '#FFFFFF',
  textColor: '#000000',
  buttonColor: '#1E90FF',
  inputBackgroundColor: '#F5F5F5',
};

const darkTheme = {
  backgroundColor: '#333333',
  textColor: '#FFFFFF',
  buttonColor: '#FF6347',
  inputBackgroundColor: '#555555',
};

// ThemeProvider component
export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
