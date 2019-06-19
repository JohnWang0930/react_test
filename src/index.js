import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Main from './view/Main'
import Login from './view/Login'
import { observer } from 'mobx-react'


import { userStore } from './store/index'

const Index = observer(class Index extends React.Component {
    userStore = userStore
    render() {
        return (
            <BrowserRouter>
                {this.userStore.isLogin ? <Main /> : <Login />}
            </BrowserRouter>
        )
    }
})


ReactDOM.render((
    <Index></Index>
), document.getElementById('root'))