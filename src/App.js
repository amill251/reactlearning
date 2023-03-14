import { useState } from 'react'

const Button = ({ text, eventHandler }) => <button type="button" className="btn btn-primary m-2" onClick={eventHandler}>{text}</button>

const Feedback = ({ feedbackControls }) => {
  const { good, neutral, bad } = feedbackControls
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text={good.text} eventHandler={good.clickHandler} />
      <Button text={neutral.text} eventHandler={neutral.clickHandler} />
      <Button text={bad.text} eventHandler={bad.clickHandler} />
    </div>
  )
}

const Display = ({ text, value }) => <p>{text} {value}</p>

const Statistics = ({ votes }) => {
  const { good, neutral, bad } = votes
  const sum = good.value + neutral.value + bad.value
  const avg = ((good.value * good.score) + (bad.value * bad.score)) / 3
  const percentPositive = sum !== 0 ? good.value / sum : 0
  if (sum) {
    return (
      <div>
        <h1>Statistics</h1>
        <Display text={good.text} value={good.value} />
        <Display text={neutral.text} value={neutral.value} />
        <Display text={bad.text} value={bad.value} />
        <Display text='Num votes' value={sum} />
        <Display text='Avg' value={avg} />
        <Display text='Percent Positive' value={percentPositive + '%'} />
      </div>
    )
  } else {
    return <p>No feedback given</p>
  }
}

const AnecdoteTop = ({ anecdotes, scores }) => {
  const maxScore = Math.max(...scores)
  const index = scores.indexOf(maxScore)
  if (scores[index]) {
    return (
      <div>
        <h1>Top Voted Anecdote</h1>
        <p>{anecdotes[index]}</p>
        <p>With {scores[index]} votes</p>
      </div>
    )
  } else {
    return <></>
  }
}

const AnecdoteDaily = () => {
  const [selected, setSelected] = useState(0)

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [scores, setScores] = useState(new Array(anecdotes.length).fill(0));

  const anecdoteClickHandler = () => setSelected((prevSelected) => {
    let result
    do {
      result = Math.floor(Math.random() * anecdotes.length);
    } while (result === prevSelected);
    return result
  })
  const voteClickHandler = (selectedScore) => () => setScores((prevScores) => {
    const copyScores = [...prevScores]
    copyScores[selectedScore] += 1
    return copyScores
  })

  return (
    <>
      <div>
        <h1>Anecdote of the Day</h1>
        <p>{anecdotes[selected]}</p>
        <p>Has {scores[selected]} votes</p>
        <Button text='Next Anecdote' eventHandler={anecdoteClickHandler} />
        <Button text='Vote' eventHandler={voteClickHandler(selected)} />
      </div>
      <AnecdoteTop anecdotes={anecdotes} scores={scores} />
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const config = {
    good: {
      text: 'Good',
      value: good,
      score: 1,
      clickHandler: () => setGood((prevGood) => prevGood + 1)
    },
    neutral: {
      text: 'Neutral',
      value: neutral,
      score: 0,
      clickHandler: () => setNeutral((prevNeutral) => prevNeutral + 1)
    },
    bad: {
      text: 'Bad',
      value: bad,
      score: -1,
      clickHandler: () => setBad((prevBad) => prevBad + 1)
    }
  }

  return (
    <div className='p-3'>
      <Feedback feedbackControls={config} />
      <Statistics votes={config} />
      <hr />
      <AnecdoteDaily />
    </div>
  )
}

export default App