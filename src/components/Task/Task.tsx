import React from 'react';
import { BiX, BiEditAlt } from 'react-icons/bi';

import { getTasks, removeTask, updateTask } from '../../actions/tasksApi';
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

const Task: React.FC<TaskPropType> = ({ _id, __v, number, title, description, priority, start, color, project, board, item, dragStart }) => {
  const dispatch = useDispatch<any>();
  const activeProject = useSelector<AppStateType, string>((state) => state.tasks.activeProject);
  const tasks = useSelector<AppStateType, TaskType[]>((store) => store.tasks.tasks);

  const [editing, setEditing] = React.useState(false);
  const [titleValue, setTitleValue] = React.useState('');
  const [descriptionValue, setDescriptionValue] = React.useState('');
  const [selectedPriority, setSelectedPriority] = React.useState('');
  const priorityValue = ['Low', 'Medium', 'High'];

  const cancel = () => {
    setTitleValue('');
    setDescriptionValue('');
    setEditing(false);
  };

  const editingTask = () => {
    setEditing(false);
    let newTitle = titleValue ? titleValue[0].toUpperCase() + titleValue.slice(1) : '';
    let newDescription = descriptionValue ? descriptionValue[0].toUpperCase() + descriptionValue.slice(1) : '';
    const obj = { _id: _id, __v: __v, number: number, title: newTitle ? newTitle : title, description: newDescription ? newDescription : description, priority: selectedPriority ? selectedPriority : priority, start: start, color: color, progress: board.title, project: project };
    dispatch(updateTask(obj));
    setTitleValue('');
    setDescriptionValue('');
  };

  return (
    <div className="task" draggable="true" onDragStart={() => dragStart(board, item)}>
      <h4 className="task__title">
        #{number}.{editing ? <input type="text" value={titleValue} onChange={(e) => setTitleValue(e.target.value)} /> : title}
      </h4>
      <p className="task__description">
        <b>Description:</b>
        <br />
        <span>{editing ? <input type="text" value={descriptionValue} onChange={(e) => setDescriptionValue(e.target.value)} /> : description}</span>
      </p>
      <p className="task__progress">
        <b>Progress: </b>
        <span>{board.title}</span>
      </p>
      <p className="task__priority">
        <b>Priority: </b>
        {editing ? (
          priorityValue.map((elem, i) => (
            <span onClick={() => setSelectedPriority(elem)} key={i} className={`item-priority ${selectedPriority === elem ? 'active' : ''} `}>
              {elem}
            </span>
          ))
        ) : (
          <span>{priority}</span>
        )}
      </p>
      <p className="task__date">
        <b>Start: </b>
        <span>{start}</span>
      </p>
      <div onClick={() => dispatch(removeTask(activeProject, _id))} className="task__delete">
        <BiX />
      </div>
      {editing ? (
        ''
      ) : (
        <div onClick={() => setEditing(true)} className="task__edits">
          <BiEditAlt />
        </div>
      )}
      {editing ? (
        <div className="task__buttons">
          <button onClick={cancel}>Cancel</button>
          <button onClick={editingTask}>Edit</button>
        </div>
      ) : (
        ''
      )}
      <div className={`task__color ${color}`}></div>
    </div>
  );
};

export default Task;
