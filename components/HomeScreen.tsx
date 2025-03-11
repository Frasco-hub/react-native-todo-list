import React, { useState } from 'react';
import { View, FlatList, TextInput, Button, TouchableOpacity } from 'react-native';
import { List, FAB } from 'react-native-paper';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function addTask() {
    if (newTaskTitle.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), title: newTaskTitle, completed: false }]);
      setNewTaskTitle('');
    }
  }

  function toggleTaskCompletion(taskId: string) {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task));
  }

  function deleteTask(taskId: string) {
    setTasks(tasks.filter(task => task.id !== taskId));
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={tasks}
        keyExtractor={task => task.id}
        renderItem={({ item }) => (
          <List.Item
            title={item.title}
            description={item.completed ? 'Completed' : 'Pending'}
            onPress={() => toggleTaskCompletion(item.id)}
            right={props => (
              <TouchableOpacity onPress={() => deleteTask(item.id)}>
                <List.Icon {...props} icon="delete" />
              </TouchableOpacity>
            )}
          />
        )}
      />
      <TextInput
        placeholder="Add a new task"
        value={newTaskTitle}
        onChangeText={setNewTaskTitle}
        style={{ marginBottom: 16 }}
      />
      <Button title="Add Task" onPress={addTask} />
      <FAB
        style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
        icon="plus"
        onPress={addTask}
      />
    </View>
  );
} 