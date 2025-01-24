import {SectionList, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';

const FetchingUsingSectionList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchingApis = async () => {
      try {
        const response = await fetch('https://dummyjson.com/todos');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setTodos(result.todos);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchingApis();
  }, []);

  const sections = [
    {title: 'Section 1', data: todos.slice(0, 10)},
    {title: 'Section 2', data: todos.slice(10, 20)},
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.text}>API in React Native</Text>

      {/* Loading state */}
      {loading && (
        <View style={styles.center}>
          <Text>Loading...</Text>
        </View>
      )}

      {/* Error state */}
      {error && (
        <View style={styles.center}>
          <Text>Error: {error}</Text>
        </View>
      )}

      {/* Todo List with SectionList */}
      {!loading && !error && (
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.todoItem}>
              <Text>{item.todo}</Text>
              <Text>{item.completed ? 'Completed' : 'Not completed'}</Text>
              <Text>User ID: {item.userId}</Text>
            </View>
          )}
          renderSectionHeader={({section}) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
        />
      )}
    </View>
  );
};

export default FetchingUsingSectionList;

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
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 20,
    backgroundColor: '#f4f4f4',
    padding: 5,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
