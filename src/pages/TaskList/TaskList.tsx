import React from 'react';
import { getTasks, updateTask } from '../../actions/tasksApi';

import AddTask from '../../components/AddTask/AddTask';
import Task from '../../components/Task/Task';

import { TaskType } from '../../redux/reduscers/tasksReducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../redux/store';

import './tasklist.scss';
import { getProjects } from '../../actions/projectsApi';

export type BoardType = {
  id: number;
  title: string;
  items: TaskType[];
};

const TaskList: React.FC = () => {
  const dispatch = useDispatch<any>();
  const tasks = useSelector<AppStateType, TaskType[]>((store) => store.tasks.tasks);

  const isMounted = React.useRef(false);

  const tasksQueue = tasks.filter((item: TaskType) => item.progress === 'Queue');
  const tasksDevelopment = tasks.filter((item: TaskType) => item.progress === 'Development');
  const tasksDone = tasks.filter((item: TaskType) => item.progress === 'Done');

  const [boards, setBoards] = React.useState([
    { id: 1, title: 'Queue', items: tasksQueue },
    { id: 2, title: 'Development', items: tasksDevelopment },
    { id: 3, title: 'Done', items: tasksDone },
  ]);
  const [currentBoard, setCurrentBoard] = React.useState(null);
  const [currentItem, setCurrentItem] = React.useState(null);

  React.useEffect(() => {
    let projectId = localStorage.getItem('projectId');
    dispatch(getProjects());
    dispatch(getTasks(projectId));
  }, []);

  React.useEffect(() => {
    if (isMounted.current) {
      const arr = [tasksQueue, tasksDevelopment, tasksDone];
      const newBoards = [...boards];
      for (let i = 0; i < arr.length; i++) {
        newBoards[i].items = arr[i];
      }
      setBoards(newBoards);
      isMounted.current = false;
    }
    isMounted.current = true;
  }, [tasks]);

  const dragOverHandler = (e) => {
    e.preventDefault();
  };

  const dragStartHandler = (board: BoardType, item: TaskType) => {
    setCurrentBoard(board);
    setCurrentItem(item);
  };

  const dropCardHandler = (e, board: BoardType) => {
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    currentItem.progress = board.title;
    board.items.push(currentItem);
    dispatch(updateTask(currentItem));
    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      }),
    );
  };

  return (
    <section className="tasks container">
      <h2 className="tasks__title">Tasks</h2>
      <div className="tasks__sections">
        {boards.map((board, i) => (
          <div key={i} className="board-tasks">
            <h3 className="board-tasks__title">{board.title}</h3>
            <div className="board-tasks__list" onDragOver={(e) => dragOverHandler(e)} onDrop={(e) => dropCardHandler(e, board)}>
              {board.items.map((item: TaskType, i: number) => (
                <Task key={i} {...item} board={board} item={item} dragStart={(board, item) => dragStartHandler(board, item)} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="tasks__adding">
        <AddTask />
      </div>
    </section>
  );
};

export default TaskList;
