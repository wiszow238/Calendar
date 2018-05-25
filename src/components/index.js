import React, {Component} from 'react';
import {render} from 'react-dom';
import App from './home/Home.js';
import "../styles/app.less";

export class Index extends Component {
    render() {
        return (<App/>)
    }
}

render(<Index />, document.getElementById('root'));