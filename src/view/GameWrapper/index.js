import React from 'react'

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
            </div>
        )
    }
}