import React from 'react'
import ReactDOM from 'react-dom'
import { Widget } from 'widget-react';
//import Recaptcha from './Recaptcha'

window.onloadCallBack = ReactDOM.render(<Widget baseUrl="https://localhost:9031"/>, document.getElementById('root'))