import React from 'react';
import { Link } from 'react-router-dom';

import './header.scss';

const Header: React.FC = () => {
  return (
    <section className="header container">
      <div className="header__logo">
        <h1 className="header__title">
          <Link to="/">
            <span>T</span>o<span>D</span>o List
          </Link>
        </h1>
        <span className="header__description">Multifunctional task list</span>
      </div>
    </section>
  );
};

export default Header;
