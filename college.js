//app.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import AdmissionFormScreen from './screens/AdmissionFormScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Admission Form') {
              iconName = focused ? 'school' : 'school-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Admission Form" component={AdmissionFormScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

//screens/AdmissionFormScreen.js
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AdmissionFormScreen = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const navigation = useNavigation();

  const onSubmit = (data) => {
    console.log(data);
    window.alert("Your admission form has been submitted successfully!");
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      {/* Name Field */}
      <Text style={styles.label}>Name:</Text>
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Enter your name"
          />
        )}
        name="name"
      />
      {errors.name && <Text style={styles.errorText}>This field is required</Text>}

      {/* Email Field */}
      <Text style={styles.label}>Email:</Text>
      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
        )}
        name="email"
      />
      {errors.email && <Text style={styles.errorText}>Please enter a valid email</Text>}

      {/* Phone Field */}
      <Text style={styles.label}>Phone:</Text>
      <Controller
        control={control}
        rules={{ required: true, minLength: 10 }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Enter your phone number"
            keyboardType="numeric"
          />
        )}
        name="phone"
      />
      {errors.phone && <Text style={styles.errorText}>Please enter a valid phone number</Text>}

      {/* Undergraduate College Field */}
      <Text style={styles.label}>Undergraduate College:</Text>
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Enter your undergraduate college name"
          />
        )}
        name="undergraduateCollege"
      />
      {errors.undergraduateCollege && <Text style={styles.errorText}>This field is required</Text>}

      {/* 10th Percentage Field */}
      <Text style={styles.label}>10th Percentage:</Text>
      <Controller
        control={control}
        rules={{ 
          required: true,
          validate: value => value >= 0 && value <= 100 || "Percentage should be between 0 and 100"
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Enter your 10th percentage"
            keyboardType="numeric"
          />
        )}
        name="tenthPercentage"
      />
      {errors.tenthPercentage && <Text style={styles.errorText}>{errors.tenthPercentage.message || 'This field is required'}</Text>}

      {/* 12th Percentage Field */}
      <Text style={styles.label}>12th Percentage:</Text>
      <Controller
        control={control}
        rules={{ 
          required: true,
          validate: value => value >= 0 && value <= 100 || "Percentage should be between 0 and 100"
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Enter your 12th percentage"
            keyboardType="numeric"
          />
        )}
        name="twelfthPercentage"
      />
      {errors.twelfthPercentage && <Text style={styles.errorText}>{errors.twelfthPercentage.message || 'This field is required'}</Text>}

      {/* Submit Button */}
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default AdmissionFormScreen;


//screens/HomeScreen.js
import React from 'react';
import { View, Text } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to the College Admission App</Text>
    </View>
  );
};

export default HomeScreen;
