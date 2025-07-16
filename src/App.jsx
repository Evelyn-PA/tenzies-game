import { useState, useRef, useEffect } from "react"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'
import Dice from "./Components/Dice"
import { Analytics } from "@vercel/analytics/react"

export default function App() {
  const [dice, setDice] = useState(() => generateAllNewDice())

  function generateAllNewDice() {
    return new Array(10)
      .fill(0) //Fills 10 slots of array with 0 - just to make them usable
      .map(() => ({
        id: nanoid(), // Creare ID
        value: Math.ceil(Math.random() * 6),//for each slot value, it returns a random number between 1 to 6
        isHeld: false
      }))
  }

  const buttonRef = useRef(null)

  const gameWon = dice.every(item => item.isHeld)
    && dice.every(item => item.value === dice[0].value)

  //Use useEffect to render the focus to button when the gameWon = true
  useEffect(() => {
    buttonRef.current.focus()
  }, [gameWon])
  function getRoll() {
    if (gameWon) {
      setDice(generateAllNewDice())
    }
    else {
      setDice(prevDice => prevDice.map(item => {
        return item.isHeld ? item : { ...item, value: Math.ceil(Math.random() * 6) };
      }));
    }
  }

  function hold(id) {
    setDice(prevDice => prevDice.map(item => {
      return item.id === id ? { ...item, isHeld: !item.isHeld } : item
    }))
  }

  const diceElement = dice.map(diceObj => <Dice
    key={diceObj.id}
    id={diceObj.id}
    value={diceObj.value}
    isHeld={diceObj.isHeld}
    hold={hold}
  />)

  return (
    <main>
      <h1>Tenzies Game</h1>
      <p className="instructions">Roll until all dice are the same.<br />Click each dice to freeze it at its current value between rolls.</p>
      <div className="container">
        {diceElement}
      </div>
      {gameWon && <Confetti />}
      <button ref={buttonRef} className="roll-button" onClick={getRoll}>{gameWon ? "New Game" : "Roll Dice"}</button>

      <Analytics />
    </main>

  );

}
