import { Dispatch } from 'redux';
import { tasksApi } from '../../APIrequests/tasksApi';

export type TaskType = {
  id: string;
  project_id: number;
  title: string;
  description: string;
  priority: string;
  start: string;
};

export type StateTasksType = {
  tasksQueue: TaskType[];
  tasksDevelopment: TaskType[];
  tasksDone: TaskType[];
  activeProject: string;
};

const initialState: StateTasksType = {
  tasksQueue: [],
  tasksDevelopment: [],
  tasksDone: [],
  activeProject: '',
};

export const tasksReducer = (state: StateTasksType = initialState, action: ActionType) => {
  switch (action.type) {
    case 'ADDING_TASK_QUEUE':
      return { ...state, tasksQueue: [...state.tasksQueue, action.data] };
    case 'GET_TASK_QUEUE':
      const queue = action.data.filter((item: TaskType) => item.project_id === Number(state.activeProject));
      return { ...state, tasksQueue: queue };
    case 'GET_TASK_DEVELOPMENT':
      const development = action.data.filter((item: TaskType) => item.project_id === Number(state.activeProject));
      return { ...state, tasksDevelopment: development };
    case 'GET_TASK_DONE':
      const done = action.data.filter((item: TaskType) => item.project_id === Number(state.activeProject));
      return { ...state, tasksDone: done };
    case 'GET_ACTIVE_PROJECT':
      return { ...state, activeProject: action.id };
    case 'REMOVE_TASK':
      return { ...state, tasksQueue: state.tasksQueue.filter((item) => item.id !== action.data.id) };
    default:
      return state;
  }
};

//actions
const addQueueTaskAC = (data: TaskType) => ({ type: 'ADDING_TASK_QUEUE', data } as const);
const getTasksQueueAC = (data: TaskType[]) => ({ type: 'GET_TASK_QUEUE', data } as const);
const getTasksDevelopmentAC = (data: TaskType[]) => ({ type: 'GET_TASK_DEVELOPMENT', data } as const);
const getTasksDoneAC = (data: TaskType[]) => ({ type: 'GET_TASK_DONE', data } as const);
const getActiveProjectAC = (id: string) => ({ type: 'GET_ACTIVE_PROJECT', id } as const);
const removeTaskAC = (data: TaskType) => ({ type: 'REMOVE_TASK', data } as const);
//types
type ActionType = ReturnType<typeof getTasksQueueAC> | ReturnType<typeof getTasksDevelopmentAC> | ReturnType<typeof getTasksDoneAC> | ReturnType<typeof getActiveProjectAC> | ReturnType<typeof addQueueTaskAC> | ReturnType<typeof removeTaskAC>;

export const getTaskQueueTC = () => {
  return (dispatch: Dispatch<any>) => {
    tasksApi.getQueue().then((res) => dispatch(getTasksQueueAC(res.data)));
  };
};

export const addQueueTaskTC = (obj: TaskType) => {
  return (dispatch: Dispatch<any>) => {
    tasksApi.addQueue(obj).then((res) => dispatch(addQueueTaskAC(res.data)));
  };
};

export const getTaskDevelopmentTC = () => {
  return (dispatch: Dispatch<any>) => {
    tasksApi.getDevelopment().then((res) => dispatch(getTasksDevelopmentAC(res.data)));
  };
};

export const getTaskDoneTC = () => {
  return (dispatch: Dispatch<any>) => {
    tasksApi.getDone().then((res) => dispatch(getTasksDoneAC(res.data)));
  };
};

export const removeTaskTC = (id: string) => {
  return (dispatch: Dispatch<any>) => {
    tasksApi.removeTask(id).then((res) => dispatch(removeTaskAC(res.data)));
  };
};

export const getActiveProject = (id: string) => (dispatch: Dispatch<any>) => {
  dispatch(getActiveProjectAC(id));
};
