import React from 'react';

import './marker.scss';

type MarkerProps = {
  color: string;
  id: number;
  activating: (id: number) => void;
  active: number;
};

const Marker: React.FC<MarkerProps> = ({ id, color, activating, active }) => {
  return <div onClick={() => activating(id)} className={`marker ${color} ${active === id ? 'activeColor' : ''}`}></div>;
};

export default Marker;
