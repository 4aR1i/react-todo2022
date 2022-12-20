import axios from 'axios';
import { Dispatch } from 'react';
import { addTaskAC, getTasksAC, removeTaskAC, TaskType } from '../redux/reduscers/tasksReducer';

export const addTask = (obj: TaskType) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/projects/tasks/', obj);
      dispatch(addTaskAC(data));
    } catch (e) {
      console.error('Произошла ошибка при добавлении задачи');
    }
  };
};

export const updateTask = (obj: TaskType) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await axios.put('http://localhost:5000/api/projects/', obj);
      dispatch(getTasksAC(data));
    } catch (e) {
      console.error('Произошла ошибка при загрузке списка задач');
    }
  };
};

export const getTasks = (id: string) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/projects/tasks/${id}`);
      dispatch(getTasksAC(data));
    } catch (e) {
      console.error('Произошла ошибка при загрузке списка задач');
    }
  };
};

export const removeTask = (projectId: string, id: string) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await axios.delete(`http://localhost:5000/api/projects/${projectId}/tasks/${id}`);
      dispatch(removeTaskAC(data));
    } catch (e) {
      console.error('Произошла ошибка при удалении задачи');
    }
  };
};
