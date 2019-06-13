import React from 'react'
import SideBar from '../SideBar'
import GameWrapper from '../GameWrapper'
import 'antd/dist/antd.css'
import {Switch,Route} from 'react-router-dom'
import Game from '../Game'
import Empty from '../Empty'
import styles from './index.module.scss'
import  './index.scss'

import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            str: 'Hello, it\'s index'
        }
    }
    render() {
        return (
            <Layout className={styles.layout}>
                <Header style={{color:'white'}}>大家好，这是头部广告位哈哈哈</Header>
                <Layout>
                    <Sider>
                        <SideBar />
                    </Sider>
                    <Content>
                        <Switch>
                            <Route path="/game_wrap" component={GameWrapper}></Route>
                            <Route path="/game" component={Game}></Route>
                            <Route component={Empty}></Route>
                        </Switch>
                    </Content>
                </Layout>
                <Footer>大家好，这是底部广告位哈哈哈</Footer>
            </Layout>
        )
    }
}