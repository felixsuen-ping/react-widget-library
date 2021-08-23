import React, { Component } from 'react'
import { Widget } from 'widget-react';

const isReady = () => typeof window !== 'undefined' 
    && typeof window.grecaptcha !== 'undefined' 
    && typeof window.grecaptcha.render === 'function'

export default class Recaptcha extends Component {
    
    constructor(props) {
        super(props);
        this._renderGrecaptcha = this._renderGrecaptcha.bind(this);
        this.state = {
            ready: isReady()
        }
        this.timer = null;
    }

    _updateReadyState() {
        if (isReady()) {
            this.setState({
                ready: true,
            });
            clearInterval(this.timer);
        }
    }

    componentDidMount() {
        console.log(isReady());
        if (isReady()) {
            this._renderGrecaptcha();
        } else {
            const delay = setInterval(() => {
                if (isReady()) {
                    this._renderGrecaptcha();
                    this._timerStop();
                }
            }, 1000);
            this.timer = delay;
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    _renderGrecaptcha() {
        this.setState({
            ready: true
        });
    }

    _timerStop() {
        clearInterval(this.timer);
    }

    render() {
        return (
            <div>
                {this.state.ready ? console.log(window.grecaptcha) : console.log(this.state.ready)} 
                {this.state.ready ? 
                    <Widget baseUrl="https://localhost:9031" 
                    grecaptcha={window.grecaptcha} /> : 
                    null
                }
                
            </div>
        )
    }
}