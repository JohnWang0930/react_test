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
    constructor(arg) {
        super(arg)
        this.state = { // 初始化状态
            squareData: [null, null, null, null, null, null, null, null, null],
            isXsTurn: true,
        }
    }
    renderSquare(i) {
        return <Square value={this.state.squareData[i]}
            index={i}
            onClick={(index) => this.handleClick(index)} />;
    }

    handleClick(i) {
        this.setState(prevState => {
            if (this.state.squareData[i] || calculateWinner(this.state.squareData)){
                return
            }
            const squareData = [...prevState.squareData]
            const isXsTurn = !prevState.isXsTurn
            squareData[i] = prevState.isXsTurn ? 'X' : 'O'
            return {
                squareData,
                isXsTurn,
            }
        })
    }
    render() {
        const winner = calculateWinner(this.state.squareData)
        let status = ''
        if (!winner) {
            status = `Next player:${this.state.isXsTurn ? 'X' : 'O'}`
        }else{
            status = `winner is: ${winner}`
        }

        return (
            <div>
                <div className="status">{status}</div>
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
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
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
