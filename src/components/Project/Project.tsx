import React from 'react';
import { Link } from 'react-router-dom';
import { BiX } from 'react-icons/bi';

import { removeProject } from '../../actions/projectsApi';
import { ProjectsType } from '../../redux/reduscers/projectsReducer';
import { getActiveProject } from '../../redux/reduscers/tasksReducer';
import { useDispatch } from 'react-redux';

import './project.scss';

const Project: React.FC<ProjectsType> = ({ _id, title, color, tasks }) => {
  const dispatch = useDispatch<any>();

  const removeButton = () => {
    dispatch(removeProject(_id));
  };

  const chooseProject = () => {
    dispatch(getActiveProject(_id));
    localStorage.setItem('projectId', `${_id}`);
  };

  return (
    <div onClick={() => chooseProject()} className={`project ${color}`}>
      <Link to="/tasks">
        <h3 className="project__title">{title}</h3>
        <b>Tasks: </b><span>{tasks.length}</span>
      </Link>
      <div onClick={removeButton} className="project__delete">
        <BiX />
      </div>
    </div>
  );
};

export default Project;
