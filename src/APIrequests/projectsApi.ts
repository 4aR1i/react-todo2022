import axios from 'axios';
import { ProjectsType } from '../redux/reduscers/projectsReducer';

export const projectsApi = {
  async getProjects() {
    try {
      return await axios.get('https://6380e21f786e112fe1bd00a7.mockapi.io/Projects');
    } catch (error) {
      console.error('Произошла ошибка при загрузке проектов.');
    }
  },
  async addProject(obj: ProjectsType) {
    try {
      const data = await axios.post('https://6380e21f786e112fe1bd00a7.mockapi.io/Projects', obj);
      return data;
    } catch (error) {
      console.error('Произошла ошибка при создании проекта.');
    }
  },
  async removeProject(id: string) {
    try {
      const data = await axios.delete(`https://6380e21f786e112fe1bd00a7.mockapi.io/Projects/${Number(id)}`);
      return data;
    } catch (error) {
      console.error('Произошла ошибка при удалении проекта.');
    }
  },
};
