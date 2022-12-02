import axios from 'axios';
import { TaskType } from '../redux/reduscers/tasksReducer';

export const tasksApi = {
  async getQueue() {
    try {
      return await axios.get('https://6380e21f786e112fe1bd00a7.mockapi.io/TasksQueue');
    } catch (error) {
      console.error('Произошла ошибка при загрузке задач.');
    }
  },
  async addQueue(obj: TaskType) {
    try {
      const data = await axios.post('https://6380e21f786e112fe1bd00a7.mockapi.io/TasksQueue', obj);
      return data;
    } catch (error) {
      console.error('Произошла ошибка при создании задачи.');
    }
  },
  async getDevelopment() {
    try {
      return await axios.get('https://6380e21f786e112fe1bd00a7.mockapi.io/TasksDevelopment');
    } catch (error) {
      console.error('Произошла ошибка при загрузке задач.');
    }
  },
  async getDone() {
    try {
      return await axios.get('https://6380e21f786e112fe1bd00a7.mockapi.io/TasksDone');
    } catch (error) {
      console.error('Произошла ошибка при загрузке задач.');
    }
  },
  async removeTask(id: string) {
    try {
      const data = await axios.delete(`https://6380e21f786e112fe1bd00a7.mockapi.io/TasksQueue/${Number(id)}`);
      return data;
    } catch (error) {
      console.error('Произошла ошибка при удалении задачи.');
    }
  },
};
