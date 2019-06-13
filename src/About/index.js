import React from 'react'

export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            str: 'Hello, it\'s about'
        }
    }
    render() {
        return (
            <div>
                <div className="header">
                    {this.state.str}
                </div>
                {this.props.children}
            </div>
        )
    }
}