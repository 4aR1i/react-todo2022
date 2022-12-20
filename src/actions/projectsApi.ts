import axios from 'axios';
import { Dispatch } from 'redux';
import { addProjectAC, getProjectsAC, ProjectsType, removeProjectAC } from '../redux/reduscers/projectsReducer';

export const getProjects = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}api/projects`);
      dispatch(getProjectsAC(data));
    } catch (error) {
      console.error('Произошла ошибка при загрузке проектов');
    }
  };
};

export const addProject = (obj: ProjectsType) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}api/projects`, obj);
      dispatch(addProjectAC(data));
    } catch (error) {
      console.error('Произошла ошибка при создании проекта');
    }
  };
};

export const removeProject = (id: string) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}api/projects/${id}`);
      dispatch(removeProjectAC(data));
    } catch (error) {
      console.error('Произошла ошибка при удалении проекта');
    }
  };
};
