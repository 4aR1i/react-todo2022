import { Dispatch } from 'react';
import { projectsApi } from '../../APIrequests/projectsApi';

export type ProjectsType = {
  id: string;
  project_id: number;
  title: string;
  color: string;
};

export type StateProjectsType = {
  projects: ProjectsType[];
};

const initialState: StateProjectsType = {
  projects: [],
};

export const projectsReducer = (state: StateProjectsType = initialState, action: ActionType) => {
  switch (action.type) {
    case 'GET_PROJECTS':
      return { ...state, projects: action.data };
    case 'ADD_PROJECT':
      return { ...state, projects: [...state.projects, action.data] };
    case 'REMOVE_PROJECT':
      return { ...state, projects: state.projects.filter((item) => item.id !== action.data.id) };
    default:
      return state;
  }
};

//action
const getProjectsAC = (data: ProjectsType[]) => ({ type: 'GET_PROJECTS', data } as const);
const addProjectAC = (data: ProjectsType) => ({ type: 'ADD_PROJECT', data } as const);
const removeProjectAC = (data: ProjectsType) => ({ type: 'REMOVE_PROJECT', data } as const);
//types
type ActionType = ReturnType<typeof getProjectsAC> | ReturnType<typeof addProjectAC> | ReturnType<typeof removeProjectAC>;

export const getProjectsTC = () => {
  return (dispatch: Dispatch<any>) => {
    projectsApi.getProjects().then((res) => dispatch(getProjectsAC(res.data)));
  };
};
export const addProjectTC = (obj: ProjectsType) => {
  return (dispatch: Dispatch<any>) => {
    projectsApi.addProject(obj).then((res) => dispatch(addProjectAC(res.data)));
  };
};
export const removeProjectTC = (id: string) => {
  return (dispatch: Dispatch<any>) => {
    projectsApi.removeProject(id).then((res) => dispatch(removeProjectAC(res.data)));
  };
};
