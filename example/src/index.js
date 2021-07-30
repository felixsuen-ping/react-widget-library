
import React from 'react'
import ReactDOM from 'react-dom'
import {Widget} from 'widget-react'

const grecaptcha = window.grecaptcha;

var authnWidget;

function checkRecaptcha(token) {
    console.log('captcha response: ' + token);
    if (token.length === 0) {
        //reCaptcha not verified
        authnWidget.clearPendingState();
        console.log('did not pass captcha try again');
    } else {
        authnWidget.dispatchPendingState(token);
    }
}

function invokeReCaptcha() {
    let token = grecaptcha.getResponse();
    if(token) {
        checkRecaptcha(token);
    }
    else {
        grecaptcha.execute();
    }
}

ReactDOM.render(<Widget 
                baseUrl="https://localhost:9031" 
                grecaptcha={grecaptcha} 
                checkRecaptcha="checkRecaptcha" 
                invokeReCaptcha={invokeReCaptcha}
                />, document.getElementById('root'))