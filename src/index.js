import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Main from './Main'
import About from './About'
import GameWrapper from './GameWrapper'



ReactDOM.render((
    <BrowserRouter>
        <Main>
            <Switch>
                <Route path="/about" component={About} />
                <Route path="/game_wrapper" component={GameWrapper}></Route>
            </Switch>
        </Main>
    </BrowserRouter>
), document.getElementById('root'))