import React from 'react';

import AddTask from '../../components/AddTask/AddTask';
import Task from '../../components/Task/Task';

import { getActiveProject, getTaskDevelopmentTC, getTaskDoneTC, getTaskQueueTC, StateTasksType, TaskType } from '../../redux/reduscers/tasksReducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../redux/store';

import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import './tasklist.scss';

const TaskList: React.FC = () => {
  const dispatch = useDispatch<any>();
  const { tasksQueue, tasksDevelopment, tasksDone } = useSelector<AppStateType, StateTasksType>((store) => store.tasks);
  console.log(tasksQueue);

  const isMounted = React.useRef(false);

  const [boards, setBoards] = React.useState([
    { id: 1, title: 'Queue', items: tasksQueue },
    { id: 2, title: 'Development', items: tasksDevelopment },
    { id: 3, title: 'Done', items: tasksDone },
  ]);

  React.useEffect(() => {
    let projectId = localStorage.getItem('projectId');
    dispatch(getActiveProject(projectId));
    dispatch(getTaskQueueTC());
    dispatch(getTaskDevelopmentTC());
    dispatch(getTaskDoneTC());
  }, []);

  React.useEffect(() => {
    if (isMounted.current) {
      const arr = [tasksQueue, tasksDevelopment, tasksDone];
      const newBoards = [...boards];
      let i: number;
      for (i = 0; i < arr.length; i++) {
        newBoards[i].items = arr[i];
      }
      setBoards(newBoards);
      isMounted.current = false;
    }
    isMounted.current = true;
  }, [tasksQueue]);

  return (
    <DndProvider backend={HTML5Backend}>
      <section className="tasks container">
        <h2 className="tasks__title">Tasks</h2>
        <div className="tasks__sections">
          {boards.map((board, i) => (
            <div key={i} className="item-tasks">
              <h3 className="item-tasks__title">{board.title}</h3>
              <div className="item-tasks__list">
                {board.items.map((item: TaskType, i: number) => (
                  <Task key={i} {...item} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="task__adding">
          <AddTask />
        </div>
      </section>
    </DndProvider>
  );
};

export default TaskList;
