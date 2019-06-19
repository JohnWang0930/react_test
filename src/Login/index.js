import React from 'react'
import { Input,Button  } from 'antd'
import {userStore} from '../store/index'
export default class Login extends React.Component{
    userStore=userStore
    state = {
        username : '',
        password:'',
    }
    handleInput=(type,e)=>{
        this.setState({
            [type]:e.target.value,
        })
    }
    login = ()=>{
        this.userStore.setToken('token',Date.now()+60*1000)
    }
    render(){
        return (
            <div>
                <Input onInput={e=>this.handleInput('username',e)} value={this.state.username} placeholder="请输入账号"></Input>
                <Input onInput={e=>this.handleInput('password',e)} value={this.state.password} placeholder="请输入密码"></Input>
                <Button type="primary" onClick={this.login}>登陆</Button>
            </div>
        )
    }
}