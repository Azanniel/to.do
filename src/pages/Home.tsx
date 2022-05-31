import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number;
  taskTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if(tasks.find(item => item.title === newTaskTitle.trim())) {
      return Alert.alert(
        'Task já cadastrada', 
        'Você não pode cadastrar uma task com o mesmo nome'
      );
    }

    const data: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    };

    setTasks(oldValue => [...oldValue, data]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }));
    const taskToUpdate = updatedTasks.find(item => item.id === id);

    if(!taskToUpdate) {
      return
    }

    taskToUpdate.done = !taskToUpdate.done;

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não',
          style: 'cancel'
        },
        {
          text: 'Sim',
          style: 'destructive',
          onPress: () => {
            setTasks(oldValue => oldValue.filter(item => item.id !== id));
          }
        }
      ]
    );
  }

  function handleEditTask({taskId, taskTitle}: EditTaskArgs) {
    const updatedTasks = tasks.map(task => ({ ...task }));

    const taskToUpdate = updatedTasks.find(item => item.id === taskId);

    if(!taskToUpdate) {
      return;
    }

    if(updatedTasks.find(item => item.title === taskTitle.trim())) {
      return Alert.alert(
        'Task já cadastrada', 
        'Você não pode atualizar uma task com o mesmo nome'
      );
    }

    taskToUpdate.title = taskTitle;

    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})