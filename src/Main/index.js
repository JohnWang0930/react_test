import React from 'react'
import { Link } from 'react-router-dom'

export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            str: 'Hello, it\'s index'
        }
    }
    render() {
        return (
            <div>
                <div className="header">
                    {this.state.str}
                </div>
                <div>
                    <Link to="/about">about</Link>
                </div>
                <div>
                    <Link to="/game_wrapper">game_wrapper</Link>
                </div>
                <div>
                    <Link to="/game_wrapper/123">123</Link>
                </div>

                {this.props.children}
            </div>
        )
    }
}