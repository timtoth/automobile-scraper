import React from 'react';
import ReactDOM from 'react-dom';
import CarInfoLanding from './CarInfoLanding';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CarInfoLanding />, div);
  ReactDOM.unmountComponentAtNode(div);
});