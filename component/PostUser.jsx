import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Toast from 'react-native-toast-message';

const PostUser = ({onClose}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = 'http://192.168.163.66:3000/users';

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'All fields are required!',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter a valid email address!',
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, email, password}),
      });
      const result = await response.json();
      if (response.ok) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: `User Registered! ID: ${result.id}`,
        });
        onClose();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: `Registration failed: ${result.message}`,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `Something went wrong: ${error.message}`,
      });
    }
    setIsLoading(false);
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register Form</Text>
      <TextInput
        placeholder="Enter Name"
        style={styles.textInput}
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Enter Email"
        style={styles.textInput}
        placeholderTextColor="#999"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Enter Password"
        style={styles.textInput}
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {isLoading && <Text>Loading...</Text>}
      <View style={styles.buttonContainer}>
        <Button
          title="Register"
          onPress={handleRegister}
          color="#6200ee"
          disabled={isLoading}
        />
      </View>
      <Toast />
    </View>
  );
};

export default PostUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginBottom: 30,
  },
  textInput: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%',
    borderRadius: 10,
  },
});
