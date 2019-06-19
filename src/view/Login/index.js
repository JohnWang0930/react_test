import React from 'react'
import { Input, Button, message } from 'antd'
import { userStore } from '../../store'
import style from './index.module.scss'
export default class Login extends React.Component {
    userStore = userStore
    state = {
        username: '',
        password: '',
        fakeUser: {
            name: 'zhen_wang',
            pwd: '111111'
        },
    }
    handleInput = (type, e) => {
        this.setState({
            [type]: e.target.value,
        })
    }
    async checkPwd() {
        await new Promise(async resolve => {
            await message.loading('登陆中')
            resolve()
        })
        return this.state.username === this.state.fakeUser.name &&
            this.state.password === this.state.fakeUser.pwd
    }
    login = async () => {
        const isCanLogin = await this.checkPwd()
        if (isCanLogin){
            await message.success('登陆成功')
            this.userStore.setToken('token', Date.now() + 60 * 1000)
        }else{
            await message.error('账号密码错误')
        }
    }
    render() {
        return (
            <div className={style.wrapper}>
                <span className={style.wrapper_title}>请登陆</span>
                <Input
                    className={style.wrapper_input}
                    onInput={e => this.handleInput('username', e)}
                    value={this.state.username}
                    placeholder="请输入账号"></Input>
                <Input
                    className={style.wrapper_input}
                    onInput={e => this.handleInput('password', e)}
                    value={this.state.password}
                    placeholder="请输入密码"></Input>
                <Button type="primary" onClick={this.login}>登陆</Button>
            </div>
        )
    }
}