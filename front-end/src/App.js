import React from 'react'
import AppBar from 'components/AppBar'
import BoardBar from 'components/BoardBar'
import BoardContainer from 'components/BoardContainer'
import './App.scss'
import ProgressBar from 'components/ProgressBar'

function App() {
  return (
    <>
      <ProgressBar />
      <div className="container">
        <AppBar />
        <BoardBar />
        <BoardContainer />
      </div>
    </>
  )
}

export default App
