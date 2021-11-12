import React from 'react'
import { AiOutlineFileAdd, AiOutlinePlus } from 'react-icons/ai'
import { connect } from 'react-redux'
import { openAddTask } from 'reducers/board'
import './index.scss'
function FooterColumn({ openAddTask, columnId }) {

  const handleAddTask = () => {
    openAddTask({ columnId, isOnTop: false })
  }
  return (
    <div className="footer">
      <div className="title" onClick={handleAddTask} >
        <AiOutlinePlus size={16} />
        <p>Thêm thẻ</p>
      </div>
      <div className="action">
        <AiOutlineFileAdd size={16} />
      </div>
    </div>
  )
}

const mapDispatchToProps = { openAddTask }
export default connect(null, mapDispatchToProps)(FooterColumn)
