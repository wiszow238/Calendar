import React, {Component} from 'react';
import {render} from 'react-dom';
import Home from "./home/Home";
import "../styles/app.less";

export class Index extends Component {
    render() {
        return (<Home/>)
    }
}

render(<Index />, document.getElementById('root'));