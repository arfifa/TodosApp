import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';

export const getTodoData = async () => {
  try {
    const todoData = await AsyncStorage.getItem('todo_data')
    return JSON.parse(todoData)
  } catch (error) {
    Alert.alert(error)
  }
}

export const storeTodoData = async data => {
  try {
    await AsyncStorage.setItem('todo_data', JSON.stringify(data))
  } catch (error) {
    Alert.alert(error)
  }
}
