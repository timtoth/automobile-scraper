import React from 'react';
import ReactDOM from 'react-dom';
import CarInfoCard from './CarInfoCard';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CarInfoCard />, div);
  ReactDOM.unmountComponentAtNode(div);
});