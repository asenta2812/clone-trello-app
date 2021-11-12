import React from 'react'
import AppBar from 'components/AppBar'
import BoardBar from 'components/BoardBar'
import BoardContainer from 'components/BoardContainer'
import './App.scss'

function App() {
  return (
    <div className="container">
      <AppBar />
      <BoardBar />
      <BoardContainer />
    </div>
  )
}

export default App
