import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Main from './Main'
import Login from './Login'
import {observer} from 'mobx-react'


import {userStore} from './store/index'

const Index = observer(class Index extends React.Component{
    userStore = userStore
    render() {
        return (
            <BrowserRouter>
            {this.userStore.isLogin ? <Main /> : <Login/>}
                
            </BrowserRouter>
        )
    }
})


ReactDOM.render((
    <Index userStore={userStore}></Index>
), document.getElementById('root'))