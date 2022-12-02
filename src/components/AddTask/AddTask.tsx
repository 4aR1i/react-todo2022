import React from 'react';
import { BiPlus } from 'react-icons/bi';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addQueueTaskTC } from '../../redux/reduscers/tasksReducer';
import { AppStateType } from '../../redux/store';

import './addtask.scss';

const AddTask: React.FC = () => {
  const priorityValue = ['Low', 'Medium', 'High'];

  const dispatch = useDispatch<any>();
  const activeProject = useSelector<AppStateType, string>((store) => store.tasks.activeProject);

  const [openAddTask, setOpenAddTask] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [textAreaValue, setTextAreaValue] = React.useState('');
  const [selectedPriority, setSelectedPriority] = React.useState('Medium');
  const [openPriority, setOpenPriority] = React.useState(false);

  const choosePriority = (elem: string) => {
    setSelectedPriority(elem);
    setOpenPriority((prev) => !prev);
  };

  const adding = () => {
    const date = new Date();
    const startDate = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
    const obj = { id: '', title: inputValue, description: textAreaValue, project_id: Number(activeProject), priority: selectedPriority, start: startDate };
    dispatch(addQueueTaskTC(obj));
    setOpenAddTask(false);
    setInputValue('');
    setTextAreaValue('');
    setSelectedPriority('Medium');
  };

  if (!openAddTask) {
    return (
      <div onClick={() => setOpenAddTask((prev) => !prev)} className="addtask">
        <BiPlus />
        <p>Add new task</p>
      </div>
    );
  }
  return (
    <div className="popup-addtask">
      <input className="popup-addtask__input" placeholder="Task name..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text" />
      <textarea className="popup-addtask__input" placeholder="Task description..." value={textAreaValue} onChange={(e) => setTextAreaValue(e.target.value)} />
      <div className="popup-addtask__priority">
        <b>Priority:</b>
        {openPriority ? (
          <div className="popup-priority">
            {priorityValue.map((elem, i) => (
              <p onClick={() => choosePriority(elem)} key={i} className="popup-priority__item">
                {elem}
              </p>
            ))}
          </div>
        ) : (
          <span onClick={() => setOpenPriority((prev) => !prev)}>{selectedPriority}</span>
        )}
      </div>
      <div className="popup-addtask__buttons">
        <button onClick={adding}>Add</button>
        <button onClick={() => setOpenAddTask((prev) => !prev)}>Cancel</button>
      </div>
    </div>
  );
};

export default AddTask;
