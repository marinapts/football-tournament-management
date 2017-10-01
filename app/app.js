import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Load CSS files
import 'materialize';
import './scss/index.scss';

import store from './store';
import Root from 'Root';

window.jQuery = window.$ = require('jquery');
window.$.velocity = require('velocity-animate/velocity.js')

// Load JS files
import 'Materialize';
injectTapEventPlugin();

ReactDOM.render(
    <Root store={store} />,
    document.getElementById('app')
);
