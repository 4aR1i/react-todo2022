import React from 'react';
import { Link } from 'react-router-dom';
import { BiX } from 'react-icons/bi';

import { ProjectsType, removeProjectTC } from '../../redux/reduscers/projectsReducer';
import { getActiveProject } from '../../redux/reduscers/tasksReducer';
import { useDispatch } from 'react-redux';

import './project.scss';

const Project: React.FC<ProjectsType> = ({ id, project_id, title, color }) => {
  const dispatch = useDispatch<any>();

  const removeButton = () => {
    dispatch(removeProjectTC(id));
  };

  const chooseProject = () => {
    dispatch(getActiveProject(id));
    localStorage.setItem('projectId', `${project_id}`);
  };

  return (
    <section onClick={() => chooseProject()} className={`project ${color}`}>
      <Link to="/tasks">
        <div className="project__wrapper">
          <h3 className="project__title">{title}</h3>
          <div onClick={removeButton} className="project__delete">
            <BiX />
          </div>
        </div>
      </Link>
    </section>
  );
};

export default Project;
