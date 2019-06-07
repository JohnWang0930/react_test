import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}


function Square(props) {
    return (
        <button className="square"
            onClick={() => props.onClick(props.index)}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square key={i} value={this.props.squareData[i]}
            index={i}
            onClick={(index) => this.props.onClick(index)} />;
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = { // 初始化状态
            squareData: [null, null, null, null, null, null, null, null, null],
            isXsTurn: true,
            history:[], // 用来存储历史
        }
    }

    handleClick(i) {
        this.setState(prevState => {
            if (this.state.squareData[i] || calculateWinner(this.state.squareData)) {
                return
            }
            const history = [...prevState.history]
            history.push(prevState.squareData)
            const squareData = [...prevState.squareData]
            const isXsTurn = !prevState.isXsTurn
            squareData[i] = prevState.isXsTurn ? 'X' : 'O'
            return {
                squareData,
                isXsTurn,
                history,
            }
        })
    }

    handleHistoryClick(index){
        const squareData = this.state.history[index]
        const history = this.state.history.slice(0,index)
        const isXsTurn = index % 2 === 0
        this.setState({
            squareData,
            history,
            isXsTurn,
        })
    }
    getHistoryButton(){
        return this.state.history.map((item,index)=>{
            const desc = index ? `去第${index}步` : '去游戏开始的时候'
            return (
                <li key={index}>
                    <button  onClick={()=>this.handleHistoryClick(index)}>
                        {desc}
                    </button>
                </li>
            )
        })
    }
    render() {
        const winner = calculateWinner(this.state.squareData)
        let status = ''
        if (!winner) {
            status = `Next player:${this.state.isXsTurn ? 'X' : 'O'}`
        } else {
            status = `winner is: ${winner}`
        }


        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squareData={this.state.squareData}
                        onClick={(index) => this.handleClick(index)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{this.getHistoryButton()}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
