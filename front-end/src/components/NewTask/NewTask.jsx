import { useOnClickOutside } from 'hooks'
import React, { useEffect, useRef } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { connect } from 'react-redux'
import { addTask, openAddTask } from 'reducers/board'
import './index.scss'
function NewTask({ columnId, openAddTask, addTask }) {
  const refInput = useRef()
  const refNewTask = useRef()


  const handleOffAddTask = () => {
    openAddTask(null)
  }
  useOnClickOutside(refNewTask, handleOffAddTask)
  const handleAddTask = () => {
    const value = refInput.current.value
    if (!value) return
    const taskId = Math.random() * 10000
    addTask({ columnId, task: { taskId, title: value } })
    handleOffAddTask()
  }
  useEffect(() => {
    if (refInput && refInput.current) {
      refInput.current.focus()
      refInput.current.scrollIntoView()
    }
  }, [])
  return (
    <div className="new-task" ref={refNewTask}>
      <label htmlFor={`title-new-task-${columnId}`}>
        <textarea
          ref={refInput} type="text" placeholder="Nhập tiêu đề cho thẻ này..." name={`title-new-task-${columnId}`}
          onKeyDown={e => (e.key === 'Enter') && handleAddTask()} />
      </label>
      <div className="action">
        <button type="button" onClick={handleAddTask}>Thêm thẻ</button>
        <div className="close" onClick={handleOffAddTask}><AiOutlineClose size={20} /></div>
      </div>
    </div>
  )
}

const mapDispatchToProps = { openAddTask, addTask }
export default connect(null, mapDispatchToProps)(NewTask)
