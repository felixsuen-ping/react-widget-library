import React from 'react'
import ReactDOM from 'react-dom'
import Recaptcha from './Recaptcha'

window.onloadCallBack = ReactDOM.render(<Recaptcha />, document.getElementById('root'))