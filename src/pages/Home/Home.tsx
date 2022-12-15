import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { ProjectsType } from '../../redux/reduscers/projectsReducer';
import { AppStateType } from '../../redux/store';

import Project from '../../components/Project/Project';
import AddProject from '../../components/AddProject/AddProject';

import './home.scss';
import { getProjects } from '../../actions/projectsApi';
import { getActiveProject } from '../../redux/reduscers/tasksReducer';

const Home: React.FC = () => {
  const dispatch = useDispatch<any>();
  const projects = useSelector<AppStateType, ProjectsType[]>((store) => store.projects.projects);

  React.useEffect(() => {
    dispatch(getActiveProject(localStorage.getItem('projectId')));
    dispatch(getProjects());
  }, []);

  return (
    <section className="home container">
      <h2 className="home__title">All projects</h2>
      <div className="home__items">
        {projects.map((item: ProjectsType, i: number) => (
          <Project key={i} {...item} />
        ))}
      </div>
      <AddProject />
    </section>
  );
};

export default Home;
