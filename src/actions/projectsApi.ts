import axios from 'axios';
import { Dispatch } from 'redux';
import { addProjectAC, getProjectsAC, ProjectsType, removeProjectAC } from '../redux/reduscers/projectsReducer';

export const getProjects = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/projects');
      dispatch(getProjectsAC(data));
    } catch (error) {
      console.error('Произошла ошибка при загрузке проектов');
    }
  };
};

export const addProject = (obj: ProjectsType) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/projects', obj);
      dispatch(addProjectAC(data));
    } catch (error) {
      console.error('Произошла ошибка при создании проекта');
    }
  };
};

export const removeProject = (id: string) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await axios.delete(`http://localhost:5000/api/projects/${id}`);
      dispatch(removeProjectAC(data));
    } catch (error) {
      console.error('Произошла ошибка при удалении проекта');
    }
  };
};

