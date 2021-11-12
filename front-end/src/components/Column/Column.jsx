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
  useEffect(() => {
    const taskOrdered = mapOrder(data.tasks, data.taskOrder, 'taskId')
    setTaskOrdered([...taskOrdered])
  }, [data.tasks, data.taskOrder])


  const renderTasks = useMemo(() => {
    return taskOrdered.map(task => <Draggable key={task.taskId}><Task data={task} /></Draggable>)
  }, [taskOrdered])

  const handleDrop = useCallback((dropResult) => {
    if (handleDrop && typeof handleDrop === 'function') {
      onDrop(dropResult, data.columnId)
    }
  }, [data.columnId, onDrop])

  const handleInputTitleClick = (e) => {
    e.target.focus()
    e.target.select()
  }
  const handleInputTitleSubmit = (e) => {
    updateTitleColumn({ columnId: data.columnId, title: e.target.value })
  }
  return (
    <div className="column">
      <div className="header column-drag-handle">
        <input type="text"
          onClick={handleInputTitleClick}
          spellCheck="false"
          defaultValue={data.title}
          onKeyDown={e => (e.key === 'Enter') && e.target.blur()}
          onBlur={handleInputTitleSubmit}
        />
        <DropdownHeader columnId={data.columnId} />
      </div>
      <div className="tasks">
        {columnOpenAddTask && columnOpenAddTask.columnId === data.columnId && columnOpenAddTask.isOnTop && <NewTask columnId={data.columnId} />}
        <Container
          groupName="col"
          onDrop={handleDrop}
          getChildPayload={(index) => ({ ...taskOrdered[index], columnId: data.columnId })}
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
        {columnOpenAddTask && columnOpenAddTask.columnId === data.columnId && !columnOpenAddTask.isOnTop && <NewTask columnId={data.columnId} />}
      </div>

      {!(columnOpenAddTask && columnOpenAddTask.columnId === data.columnId) && <FooterColumn columnId={data.columnId} />}
    </div>
  )
}

Column.propTypes = {
  data: PropTypes.shape({
    tasks: PropTypes.array,
    columnId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    taskOrder: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    title: PropTypes.string
  })
}

const mapStateToProps = ({ board }) => ({
  columnOpenAddTask: board.columnOpenAddTask
})
const mapDispatchToProps = { updateTitleColumn }
export default connect(mapStateToProps, mapDispatchToProps)(Column)
