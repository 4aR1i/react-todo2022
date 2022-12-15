import React from 'react';
import { BiPlus } from 'react-icons/bi';
import { addTask } from '../../actions/tasksApi';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppStateType } from '../../redux/store';
import { TaskType } from '../../redux/reduscers/tasksReducer';

import './addtask.scss';
import { ProjectsType } from '../../redux/reduscers/projectsReducer';

const AddTask: React.FC = () => {
  const priorityValue = ['Low', 'Medium', 'High'];

  const dispatch = useDispatch<any>();
  const activeProject = useSelector<AppStateType, string>((store) => store.tasks.activeProject);
  const tasks = useSelector<AppStateType, TaskType[]>((store) => store.tasks.tasks);
  const projects = useSelector<AppStateType, ProjectsType[]>((state) => state.projects.projects);

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
    let title = inputValue ? inputValue[0].toUpperCase() + inputValue.slice(1) : '';
    const currentProject = projects.find((item) => item._id === activeProject);
    const obj = { _id: '', __v: 0, number: tasks.length + 1, title: title, description: textAreaValue, project: activeProject, priority: selectedPriority, start: startDate, progress: 'Queue', color: currentProject.color };
    dispatch(addTask(obj));
    setOpenAddTask(false);
    setInputValue('');
    setTextAreaValue('');
    setSelectedPriority('Medium');
  };

  const cancel = () => {
    setOpenAddTask((prev) => !prev);
    setInputValue('');
    setTextAreaValue('');
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
        <button onClick={cancel}>Cancel</button>
      </div>
    </div>
  );
};

export default AddTask;
