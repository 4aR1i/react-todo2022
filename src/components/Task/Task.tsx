import React from 'react';
import { BiX } from 'react-icons/bi';

import { useDispatch } from 'react-redux';
import { removeTaskTC, TaskType } from '../../redux/reduscers/tasksReducer';

import './task.scss';

const Task: React.FC<TaskType> = ({ id, title, description, priority, start }) => {
  const dispatch = useDispatch<any>();

  return (
    <div className="task">
      <h4 className="task__title">#1.{title}</h4>
      <p className="task__description">
        <b>Description:</b>
        <br />
        <span>{description}.</span>
      </p>
      <p className="task__date">
        <b>Start: </b>
        <span>{start}</span>
      </p>
      {/* <p className="task__date">
        <b>End: </b>
        <span>26.11.22</span>
      </p>
      <p className="task__time">
        <b>Time: </b>
        <span>2:30</span>
      </p> */}
      <p>
        <b>Priority: </b>
        <span>{priority}</span>
      </p>
      <div onClick={() => dispatch(removeTaskTC(id))} className="task__delete">
        <BiX />
      </div>
    </div>
  );
};

export default Task;
