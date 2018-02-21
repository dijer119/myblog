import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';
import 'styles/base.scss';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
