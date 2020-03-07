/*
*	reac后台管理系统
*	App.js
*	@author: mryyg
*	2020-03-05 20:45:56
*/

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './pages/Login/Login';
import Admin from './pages/Admin/Admin';

import './App.css';

export default class App extends Component {
    render () {
        return (
            <Router>
                <Switch>
                    <Route path='/login' component={Login} />
                    <Route path='/' component={Admin} />
                </Switch>
            </Router>
        )
    }
}
