import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Layout } from 'antd';

import SideBar from '../SideBar'
import GameWrapper from '../GameWrapper'
import Game from '../Game'
import Empty from '../Empty'
import HeaderWrapper from '../HeaderWrapper'

import 'antd/dist/antd.css'
import styles from './index.module.scss'
import './index.scss'

const { Footer, Sider, Content } = Layout


export default class Main extends React.Component {
    state = {
        str: 'Hello, it\'s index',
    }
    render() {
        return (
            <Layout className={styles.layout}>
                <HeaderWrapper></HeaderWrapper>
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