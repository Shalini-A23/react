//app.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ResultScreen({ route }) {
  const { formData } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Submitted Feedback</Text>
      <Text>Name: {formData.name}</Text>
      <Text>Email: {formData.email}</Text>
      <Text>Course: {formData.course}</Text>
      <Text>Rating: {formData.rating}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

//screens/HomeScreen.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import FeedbackForm from '../components/FeedbackForm';

export default function HomeScreen({ navigation }) {
  const [formData, setFormData] = useState(null);

  // Handle form submission
  const handleFormSubmit = (data) => {
    setFormData(data);
    navigation.navigate('Result', { formData: data });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feedback Form</Text>
      <FeedbackForm onSubmit={handleFormSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

//screens/ResultScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ResultScreen({ route }) {
  const { formData } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Submitted Feedback</Text>
      <Text>Name: {formData.name}</Text>
      <Text>Email: {formData.email}</Text>
      <Text>Course: {formData.course}</Text>
      <Text>Rating: {formData.rating}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

//components/FeedbackForm.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

export default function FeedbackForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const [rating, setRating] = useState('');
  
  // State to store validation errors
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    course: '',
    rating: ''
  });

  // Validation function to check all fields and display error messages
  const validateForm = () => {
    let isValid = true;
    let validationErrors = { name: '', email: '', course: '', rating: '' };

    if (!name || name.length < 3 || name.length > 50) {
      validationErrors.name = 'Name must be between 3 and 50 characters.';
      isValid = false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      validationErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    if (!course) {
      validationErrors.course = 'Course is required.';
      isValid = false;
    }

    if (isNaN(rating) || rating < 1 || rating > 5) {
      validationErrors.rating = 'Rating must be a number between 1 and 5.';
      isValid = false;
    }

    setErrors(validationErrors); // Update the error state
    return isValid;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      const formData = { name, email, course, rating };
      onSubmit(formData); // Pass data to the parent component
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
        maxLength={50}
      />
      {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

      <Text style={styles.label}>Course:</Text>
      <TextInput
        style={styles.input}
        value={course}
        onChangeText={setCourse}
        placeholder="Enter course name"
      />
      {errors.course ? <Text style={styles.errorText}>{errors.course}</Text> : null}

      <Text style={styles.label}>Rating (1-5):</Text>
      <TextInput
        style={styles.input}
        value={rating}
        onChangeText={setRating}
        placeholder="Enter rating"
        keyboardType="numeric"
      />
      {errors.rating ? <Text style={styles.errorText}>{errors.rating}</Text> : null}

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: '80%',
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});
