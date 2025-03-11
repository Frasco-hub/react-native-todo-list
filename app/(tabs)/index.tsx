import React, { useState } from 'react';
import { FlatList, View, useColorScheme } from 'react-native';
import { Button, List, TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export default function HomeScreen() {
  const { colors } = useTheme();
  const colorScheme = useColorScheme();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function addTask() {
    if (newTaskTitle.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), title: newTaskTitle, completed: false }]);
      setNewTaskTitle('');
    }
  }

  function toggleTaskCompletion(id: string) {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  }

  function deleteTask(id: string) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
        <TextInput
          label="New Task"
          value={newTaskTitle}
          onChangeText={setNewTaskTitle}
          onSubmitEditing={addTask}
          returnKeyType="done"
          style={{ color: colorScheme === 'dark' ? '#FFFFFF' : colors.onSurface }}
        />
        <Button mode="contained" onPress={addTask} style={{ marginVertical: 8 }}>
          Add Task
        </Button>
        <FlatList
          data={tasks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <List.Item
              titleStyle={{
                textDecorationLine: item.completed ? 'line-through' : 'none',
                color: colorScheme === 'dark' ? '#FFFFFF' : colors.onSurface,
              }}
              title={item.title}
              onPress={() => toggleTaskCompletion(item.id)}
              right={props => (
                <Button onPress={() => deleteTask(item.id)}>Delete</Button>
              )}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}
