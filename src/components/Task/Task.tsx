import React from 'react';
import { BiX } from 'react-icons/bi';

import { removeTask } from '../../actions/tasksApi';
import { useDispatch } from 'react-redux';
import { TaskType } from '../../redux/reduscers/tasksReducer';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../redux/store';

import { BoardType } from '../../pages/TaskList/TaskList';

import './task.scss';

type TaskPropType = {
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
  board: BoardType;
  item: TaskType;
  dragStart: (board: BoardType, item: TaskType) => void;
};

const Task: React.FC<TaskPropType> = ({ _id, number, title, description, priority, start, color, board, item, dragStart }) => {
  const dispatch = useDispatch<any>();
  const activeProject = useSelector<AppStateType, string>((state) => state.tasks.activeProject);

  return (
    <div className="task" draggable="true" onDragStart={() => dragStart(board, item)}>
      <h4 className="task__title">
        #{number}.{title}
      </h4>
      <p className="task__description">
        <b>Description:</b>
        <br />
        <span>{description}</span>
      </p>
      <p className="task__progress">
        <b>Progress: </b>
        <span>{board.title}</span>
      </p>
      <p className="task__priority">
        <b>Priority: </b>
        <span>{priority}</span>
      </p>
      <p className="task__date">
        <b>Start: </b>
        <span>{start}</span>
      </p>
      <div onClick={() => dispatch(removeTask(activeProject, _id))} className="task__delete">
        <BiX />
      </div>
      <div className={`task__color ${color}`}></div>
    </div>
  );
};

export default Task;
