import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import PostUser from './component/PostUser';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPostUser, setShowPostUser] = useState(false);

  const API_URL = 'http://192.168.163.66:3000/users';
  const fetchingApis = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setUsers(result);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchingApis();
  }, []);

  const handleUserCreated = () => {
    setShowPostUser(false);
    fetchingApis();
  };

  if (showPostUser) {
    return <PostUser onClose={handleUserCreated} />;
  }

  const handleDeleteuser = async id => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application.json',
        },
      });
      if (!response.ok) {
        throw new Error('failed to delete user');
      }
      //After delete update userList
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>User's Details</Text>

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => setShowPostUser(true)}>
        <Text style={styles.buttonText}>Create User</Text>
      </TouchableOpacity>

      {loading && (
        <View style={styles.center}>
          <Text>Loading...</Text>
        </View>
      )}

      {error && (
        <View style={styles.center}>
          <Text>Error: {error}</Text>
        </View>
      )}

      {!loading && !error && users.length === 0 && (
        <View style={styles.center}>
          <Text>No users found.</Text>
        </View>
      )}

      {!loading && !error && users.length > 0 && (
        <FlatList
          data={users}
          keyExtractor={(item, index) =>
            item.id?.toString() || index.toString()
          }
          renderItem={({item}) => (
            <View style={styles.todoItem}>
              <Text style={styles.name}>
                User Name: {item.name || 'No Name'}
              </Text>
              <Text style={styles.name}>
                User Email: {item.email || 'No Email'}
              </Text>
              <Text style={styles.name}>
                Password: {item.password || 'No Password'}
              </Text>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.updateButton]}>
                  <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeleteuser(item.id)}
                  style={[styles.actionButton, styles.deleteButton]}>
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    textDecorationLine: 'underline',
  },
  todoItem: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  updateButton: {
    backgroundColor: '#007bff',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
