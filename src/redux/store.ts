import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import thunk from 'redux-thunk';
import { projectsReducer } from './reduscers/projectsReducer';
import { tasksReducer } from './reduscers/tasksReducer';

const rootReducers = combineReducers({
  projects: projectsReducer,
  tasks: tasksReducer,
});

export type AppStateType = ReturnType<typeof rootReducers>;
export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
