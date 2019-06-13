import React from 'react'
import { Menu, Icon } from 'antd'
import {withRouter} from 'react-router-dom'
const { SubMenu } = Menu

class SideBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            str: 'Hello, it\'s about'
        }
    }
    handleNavigate= (e)=>{
        const key  = e.key
        this.props.history.push(key)
    }
    render() {
        return (
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
            >
                <SubMenu
                    key="sub1"
                    title={
                        <span>
                            <Icon type="user" />
                            subnav 1
              </span>
                    }
                >
                    <Menu.Item key="/game_wrap" onClick={this.handleNavigate}>option1</Menu.Item>
                    <Menu.Item key="/game" onClick={this.handleNavigate}>option2</Menu.Item>
                    <Menu.Item key="3" onClick={this.handleNavigate}>option3</Menu.Item>
                    <Menu.Item key="4" onClick={this.handleNavigate}>option4</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub2"
                    title={
                        <span>
                            <Icon type="laptop" />
                            subnav 2
              </span>
                    }
                >
                    <Menu.Item key="5">option5</Menu.Item>
                    <Menu.Item key="6">option6</Menu.Item>
                    <Menu.Item key="7">option7</Menu.Item>
                    <Menu.Item key="8">option8</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub3"
                    title={
                        <span>
                            <Icon type="notification" />
                            subnav 3
              </span>
                    }
                >
                    <Menu.Item key="9">option9</Menu.Item>
                    <Menu.Item key="10">option10</Menu.Item>
                    <Menu.Item key="11">option11</Menu.Item>
                    <Menu.Item key="12">option12</Menu.Item>
                </SubMenu>
            </Menu>
        )
    }
}

export default withRouter(SideBar)