import React from 'react';
import ReactDOM from 'react-dom';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

import './index.css';
import App from './App';

dayjs.extend(LocalizedFormat);

const mountNode = document.getElementById('app');
ReactDOM.render(<App />, mountNode);
