import React from 'react'
import { Layout, Button } from 'antd'
import { userStore } from '../../store/index'
import style from './index.module.scss'
const { Header } = Layout

export default class HeaderWrapper extends React.Component {
    render() {
        return (
            <Header className={style.wrapper}>
                <span>大家好，这是头部广告位哈哈哈</span>
                <LogoutButton></LogoutButton>
            </Header>
        )
    }
}


class LogoutButton extends React.Component {
    userStore = userStore
    handleLogout = () => {
        this.userStore.setToken('', '')
    }
    render() {
        return (
            <Button onClick={this.handleLogout}
                className={style.wrapper_logout}>登出</Button>
        )
    }
}