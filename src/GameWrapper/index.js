import React from 'react'
import {Route } from 'react-router-dom'
import Game from '../Game'

export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            str: 'Hello, it\'s game_wrapper'
        }
    }
    render() {
        return (
            <div>
                <div className="header">
                    {this.state.str}
                </div>
                <Route path="/game_wrapper/:id" component={Game} />
            </div>
        )
    }
}