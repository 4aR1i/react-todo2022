export type TaskType = {
  _id: string;
  __v: number;
  number: number;
  title: string;
  description: string;
  priority: string;
  start: string;
  project: string;
  progress: string;
  color: string;
};

export type StateTasksType = {
  tasks: TaskType[];
  activeProject: string;
};

const initialState: StateTasksType = {
  tasks: [],
  activeProject: '',
};

export const tasksReducer = (state: StateTasksType = initialState, action: ActionType) => {
  switch (action.type) {
    case 'GET_TASKS':
      return { ...state, tasks: action.data, activeProject: localStorage.getItem('projectId') };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.data] };
    case 'REMOVE_TASK':
      return { ...state, tasks: state.tasks.filter((item) => item._id !== action.data._id) };
    case 'GET_ACTIVE_PROJECT':
      return { ...state, activeProject: action.id };
    default:
      return state;
  }
};

//actions
export const getTasksAC = (data: TaskType[]) => ({ type: 'GET_TASKS', data } as const);
export const addTaskAC = (data: TaskType) => ({ type: 'ADD_TASK', data } as const);
export const removeTaskAC = (data: TaskType) => ({ type: 'REMOVE_TASK', data } as const);
export const getActiveProject = (id: string) => ({ type: 'GET_ACTIVE_PROJECT', id } as const);
//types
type ActionType = ReturnType<typeof getTasksAC> | ReturnType<typeof addTaskAC> | ReturnType<typeof removeTaskAC> | ReturnType<typeof getActiveProject>;
