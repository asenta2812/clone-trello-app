import DropdownHeader from 'components/DropdownHeader'
import FooterColumn from 'components/FooterColumn'
import NewTask from 'components/NewTask/NewTask'
import Task from 'components/Task'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { Container, Draggable } from 'react-smooth-dnd'
import { updateTitleColumn } from 'reducers/board'
import mapOrder from 'ultilites/sorts'
import './index.scss'

function Column({ data, onDrop, updateTitleColumn, columnOpenAddTask }) {
  const [taskOrdered, setTaskOrdered] = useState([])
  const [openInputTitle, setOpenInputTitle] = useState(false)
  useEffect(() => {
    const taskOrdered = mapOrder(data.tasks, data.taskOrder, '_id')
    setTaskOrdered([...taskOrdered])
  }, [data.tasks, data.taskOrder])


  const renderTasks = useMemo(() => {
    return taskOrdered.map(task => <Draggable key={task._id}><Task data={task} /></Draggable>)
  }, [taskOrdered])

  const handleDrop = useCallback((dropResult) => {
    if (handleDrop && typeof handleDrop === 'function') {
      onDrop(dropResult, data._id)
    }
  }, [data._id, onDrop])

  const handleInputTitleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    updateTitleColumn({ _id: data._id, name: e.target.value })
    setOpenInputTitle(false)
  }
  return (
    <div className="column">
      <div className="header column-drag-handle">
        {openInputTitle && <input type="text"
          autoFocus
          onFocus={e => e.target.select()}
          spellCheck="false"
          defaultValue={data.name}
          onKeyDown={e => (e.key === 'Enter') && e.target.blur()}
          onBlur={handleInputTitleSubmit}
          className="no-wrap"
        />}
        {!openInputTitle && <p onClick={() => setOpenInputTitle(true)}> {data.name}</p>}
        <DropdownHeader columnId={data._id} />
      </div>
      <div className="tasks">
        {columnOpenAddTask && columnOpenAddTask.columnId === data._id && columnOpenAddTask.isOnTop && <NewTask columnId={data._id} />}
        <Container
          groupName="col"
          onDrop={handleDrop}
          getChildPayload={(index) => ({ ...taskOrdered[index], columnId: data._id })}
          dragClass="on-drag-task"
          dropClass="on-drop-task"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'drop-preview'
          }}
        >
          {renderTasks}
        </Container>
        {columnOpenAddTask && columnOpenAddTask.columnId === data._id && !columnOpenAddTask.isOnTop && <NewTask columnId={data._id} />}
      </div>

      {!(columnOpenAddTask && columnOpenAddTask.columnId === data._id) && <FooterColumn columnId={data._id} />}
    </div>
  )
}

Column.propTypes = {
  data: PropTypes.shape({
    tasks: PropTypes.array,
    _id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    taskOrder: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    name: PropTypes.string
  })
}

const mapStateToProps = ({ board }) => ({
  columnOpenAddTask: board.columnOpenAddTask
})
const mapDispatchToProps = { updateTitleColumn }
export default connect(mapStateToProps, mapDispatchToProps)(Column)
