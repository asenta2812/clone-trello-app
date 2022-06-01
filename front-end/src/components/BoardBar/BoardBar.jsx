import React from 'react'
import { connect } from 'react-redux'
import './index.scss'
function BoardBar({ boardSelected }) {
  return (
    <div className="navbar-board">
      {boardSelected?.name}
    </div>
  )
}
const mapStateToProps = ({ board }) => ({
  boardSelected: board.boardSelected
})
export default connect(mapStateToProps, null)(BoardBar)
