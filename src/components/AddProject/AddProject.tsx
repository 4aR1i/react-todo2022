import React from 'react';
import { BiPlus } from 'react-icons/bi';
import { addProject } from '../../actions/projectsApi';

import { useDispatch, useSelector } from 'react-redux';
import { ProjectsType } from '../../redux/reduscers/projectsReducer';
import { AppStateType } from '../../redux/store';

import Marker from '../Marker/Marker';

import './addproject.scss';

const AddProject: React.FC = () => {
  const markers = [
    { id: 0, color: 'grey' },
    { id: 1, color: 'purple' },
    { id: 2, color: 'blue' },
    { id: 3, color: 'pink' },
    { id: 4, color: 'red' },
    { id: 5, color: 'lightgreen' },
    { id: 6, color: 'green' },
    { id: 7, color: 'black' },
  ];

  const [activeAddProject, setActiveAddProject] = React.useState(false);
  const [activeColor, setActiveColor] = React.useState(0);
  const [inputValue, setInputValue] = React.useState('');

  const dispatch = useDispatch<any>();

  const activatingColor = (id: number) => {
    setActiveColor(id);
  };

  const addButton = () => {
    let title = inputValue ? inputValue[0].toUpperCase() + inputValue.slice(1) : '';
    const obj = { _id: '', title: title, color: markers[activeColor].color, __v: 0, tasks: [] };
    dispatch(addProject(obj));
    setInputValue('');
    setActiveAddProject(false);
    setActiveColor(0);
  };

  return (
    <div className={`addProject ${activeAddProject ? 'active' : ''}`}>
      <div onClick={() => setActiveAddProject((prev) => !prev)} className={`addProject__plus ${activeAddProject ? 'active' : ''}`}>
        <BiPlus />
      </div>
      <input className={`addProject__input ${activeAddProject ? 'active' : ''}`} value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text" placeholder="Folder name..." />
      <div className={`addProject__markers ${activeAddProject ? 'active' : ''}`}>
        {markers.map((item, i: number) => (
          <Marker key={i} {...item} activating={activatingColor} active={activeColor} />
        ))}
      </div>
      <button onClick={addButton} disabled={inputValue ? false : true} className={`addProject__btn ${activeAddProject ? 'active' : ''}`}>
        Add
      </button>
    </div>
  );
};

export default AddProject;
