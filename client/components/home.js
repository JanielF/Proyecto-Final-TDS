import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const HomeScreen = () => {
  const [habits, setHabits] = useState([
    { id: 1, name: 'Hábito 1', completed: false },
    { id: 2, name: 'Hábito 2', completed: false },
    { id: 3, name: 'Hábito 3', completed: false },
  ]);

  const toggleHabitCompletion = (id) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Hábitos</Text>
      {habits.map((habit) => (
        <TouchableOpacity
          key={habit.id}
          onPress={() => toggleHabitCompletion(habit.id)}
          style={[
            styles.habitContainer,
            { backgroundColor: habit.completed ? '#9CCC65' : '#FFFFFF' },
          ]}
        >
          <Text style={styles.habitName}>{habit.name}</Text>
          <Text style={styles.habitStatus}>
            {habit.completed ? 'Completado' : 'Pendiente'}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  habitContainer: {
    width: '100%',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  habitName: {
    fontSize: 18,
  },
  habitStatus: {
    fontSize: 16,
    color: '#555',
  },
});

export default HomeScreen;