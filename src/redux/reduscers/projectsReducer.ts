import { TaskType } from './tasksReducer';

export type ProjectsType = {
  _id: string;
  __v: number;
  title: string;
  color: string;
  tasks: TaskType[];
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
      return { ...state, projects: state.projects.filter((item) => item._id !== action.data._id) };
    default:
      return state;
  }
};

//action
export const getProjectsAC = (data: ProjectsType[]) => ({ type: 'GET_PROJECTS', data } as const);
export const addProjectAC = (data: ProjectsType) => ({ type: 'ADD_PROJECT', data } as const);
export const removeProjectAC = (data: ProjectsType) => ({ type: 'REMOVE_PROJECT', data } as const);

//types
type ActionType = ReturnType<typeof getProjectsAC> | ReturnType<typeof addProjectAC> | ReturnType<typeof removeProjectAC>;
