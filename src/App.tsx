import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import TaskList from './pages/TaskList/TaskList';

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="line"></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<TaskList />} />
      </Routes>
    </div>
  );
};

export default App;
