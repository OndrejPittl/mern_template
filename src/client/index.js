import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';


const Root = () => {
  return (
    <Router>
      <App history={history} />
    </Router>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<Root />, rootElement);
