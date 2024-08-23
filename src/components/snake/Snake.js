import React, { useState } from "react";
import './Snake.css'

const Snake = () => {
    const [snakeDetails, setSnakeDetails] = useState([
        {
            head: 17,
            bottom: 7,
        },
        {
            head: 62,
            bottom: 19,
        },
        {
            head: 64,
            bottom: 60,
        },
        {
            head: 54,
            bottom: 34,
        },
        {
            head: 87,
            bottom: 24,
        },
        {
            head: 93,
            bottom: 73,
        },
        {
            head: 95,
            bottom: 75,
        },
        {
            head: 99,
            bottom: 78,
        }
    ])
    const [ladderDetails, setLadderDetails] = useState([
        {
            head: 14,
            bottom: 4,
        },
        {
            head: 31,
            bottom: 9,
        },
        {
            head: 38,
            bottom: 20,
        },
        {
            head: 84,
            bottom: 28,
        },
        {
            head: 59,
            bottom: 40,
        },
        {
            head: 67,
            bottom: 51,
        },
        {
            head: 81,
            bottom: 63,
        },
        {
            head: 91,
            bottom: 71,
        },
    ])
    const [currentPlace, setCurrentPlace] = useState(1)
    const [diceNumber, setDiceNumber] = useState(1)
    const [isWon, setIsWon] = useState(false)

    const generateBoard = () => {
        const board = []
        for (let i = 100; i >= 1; i--) {
            const isSnakeHead = snakeDetails.some((snake) => snake.head === i)
            const isSnakeBottom = snakeDetails.some((snake) => snake.bottom === i)
            const isLadderHead = ladderDetails.some((ladder) => ladder.head === i)
            const isLadderBottom = ladderDetails.some((ladder) => ladder.bottom === i)
            const sqaureElement = generateSquare(i, isSnakeHead, isSnakeBottom, isLadderHead, isLadderBottom, currentPlace)
            board.push(sqaureElement)
        }
        return board
    }

    const generateSquare = (i, isSnakeHead, isSnakeBottom, isLadderHead, isLadderBottom, currentPlace) => {
        let youAreHere = i === currentPlace
        if (isSnakeHead) {
            return <div key={i} className="square gird-item snake-head" data-square={i}>{youAreHere ? <span className="current"><span className="current-position">{i}</span> sh </span> : <span>{i} sh</span>}</div>
        } else if (isSnakeBottom) {
            return <div key={i} className="square gird-item snake-bottom" data-square={i}>{youAreHere ? <span className="current"><span className="current-position">{i}</span> sb </span> : <span>{i} sb</span>}</div>
        } else if (isLadderHead) {
            return <div key={i} className="square gird-item ladder-head" data-square={i}>{youAreHere ? <span className="current"><span className="current-position">{i}</span> lh </span> : `${i} lh`}</div>
        } else if (isLadderBottom) {
            return <div key={i} className="square gird-item ladder-bottom" data-square={i}>{youAreHere ? <span className="current"><span className="current-position">{i}</span> lb </span> : `${i} lb`}</div>
        } else {
            return <div key={i} className="square gird-item" data-square={i}>{youAreHere ? <span className="current"><span className="current-position">{i}</span> </span> : i}</div>
        }
    }

    const onDiceClick = () => {
        const randomNumber = Math.ceil(Math.random() * 6)
        setDiceNumber(randomNumber)
        let nextPlace = currentPlace + randomNumber
        let isNextInSnakeHead = snakeDetails.find((detail) => detail.head === nextPlace)
        let isNextInLadderBottom = ladderDetails.find((detail) => detail.bottom === nextPlace)

        if (isNextInSnakeHead?.bottom) {
            console.log('==> isNextInSnakeHead', isNextInSnakeHead)
            setCurrentPlace(nextPlace)
            let movetimeOut = setTimeout(() => {
                nextPlace = isNextInSnakeHead.bottom
                setCurrentPlace(nextPlace)
                clearTimeout(movetimeOut)
            }, 500)
            // clearTimeout(movetimeOut)
        } else if (isNextInLadderBottom?.head) {
            console.log('==> isNextInLadderBottom', isNextInLadderBottom)
            setCurrentPlace(nextPlace)
            let movetimeOut = setTimeout(() => {
                nextPlace = isNextInLadderBottom.head
                setCurrentPlace(isNextInLadderBottom.head)
                clearTimeout(movetimeOut)
            }, 500)
            // clearTimeout(movetimeOut)
        } else if (nextPlace === 100) {
            setCurrentPlace(nextPlace)
            setIsWon(true)
        } else if (nextPlace < 100) {
            setCurrentPlace(nextPlace)
        }
    }
    const generateDice = () => {
        return (
            <div className="dice-container">
                <span>Dice</span>
                <span onClick={onDiceClick} className={isWon ? "dice non-clickable" : "dice"}>
                    {diceNumber}
                </span>
            </div>
        )
    }

    const generateAfterWin = () => {
        return (
            <>
                <div>
                    Hurray You Won
                </div>
                <div onClick={resetGame}>
                    Reset
                </div>
            </>
        )
    }

    const resetGame = () => {
        setCurrentPlace(1)
        setDiceNumber(1)
        setIsWon(false)
    }

    return (
        <div>
            Snake
            <div className="snake-and-ladder-board">
                {generateBoard()}
            </div>
            {generateDice()}
            {isWon && generateAfterWin()}
        </div>
    )
}

export default Snake