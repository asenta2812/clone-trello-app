/* eslint-disable react-hooks/exhaustive-deps */
import Column from 'components/Column'
import { initData } from 'mocks/initData'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import './index.scss'
import { isEmpty } from 'lodash'
import mapOrder from 'ultilites/sorts'
import { Container, Draggable } from 'react-smooth-dnd'
import applyDrop from 'ultilites/applyDrop'
import AddNewColumn from 'components/NewColumn'
import { connect } from 'react-redux'

function BoardContainer({ columnUpdated, columnDeleted, taskAdded }) {
  const [boardData, setBoardData] = useState(initData.find(f => f.boardId === 'board-1'))

  const onDropTask = (dropResult, newColumnId) => {
    const { addedIndex, payload } = dropResult
    if (addedIndex != null) {
      const { taskId, columnId: oldColumnId } = payload
      // old column

      const columns = boardData.columns.map(item => {
        if (oldColumnId === newColumnId && newColumnId === item.columnId) {
          let taskOrder = applyDrop(item.taskOrder, dropResult)
          return { ...item, taskOrder }
        }
        if (item.columnId === oldColumnId) {
          const tasks = item.tasks.filter(f => f.taskId !== taskId)
          const taskOrder = tasks.map(f => f.taskId)

          return { ...item, tasks, taskOrder }
        }
        if (item.columnId === newColumnId) {
          const tasks = [...item.tasks, { ...payload, columnId: null }]
          item.taskOrder.splice(addedIndex, 0, taskId)

          return { ...item, tasks }
        }
        return item

      })

      setBoardData({ ...boardData, columns })
    }
  }

  useEffect(() => {
    if (!columnUpdated) return
    const { columnId, title } = columnUpdated
    let columns = boardData.columns.map(item => {
      if (item.columnId === columnId) {
        return { ...item, title }
      }
      return item
    })
    setBoardData({ ...boardData, columns })
  }, [columnUpdated])

  useEffect(() => {
    if (!columnDeleted) return
    const { columnId } = columnDeleted
    let columns = boardData.columns.filter(item => item.columnId !== columnId)
    let columnOrder = columns.map(m => m.columnId)
    setBoardData({ ...boardData, columns, columnOrder })
  }, [columnDeleted])

  useEffect(() => {
    if (!taskAdded) return

    const { columnId, task, isOnTop } = taskAdded

    const columns = boardData.columns.map(column => {
      if (column.columnId === columnId) {
        let tasks = [...column.tasks]
        if (isOnTop) {
          tasks.unshift(task)
        } else {
          tasks.push(task)
        }
        return { ...column, tasks, taskOrder: tasks.map(m => m.taskId) }
      }
      return column
    })
    setBoardData({ ...boardData, columns })
  }, [taskAdded])


  const renderColumn = useMemo(() => {
    if (isEmpty(boardData)) {
      return null
    }
    const columnOrdered = mapOrder(boardData.columns, boardData.columnOrder, 'columnId')
    return columnOrdered.map(col => <Draggable key={col.columnId} className="column-wrapper"><Column key={col.columnId} data={col} onDrop={onDropTask} /></Draggable>)
  }, [boardData])

  const onColumnDrop = (data) => {
    setBoardData(old => ({ ...old, columnOrder: applyDrop(old.columnOrder, data) }))
  }

  const onAddColumn = useCallback((title) => {
    const randomId = Math.random() * 10000
    if (!title) {
      return null
    }
    const boardDataTemp = { ...boardData }
    boardDataTemp.columnOrder.push(randomId)
    boardDataTemp.columns.push({ columnId: randomId, title, taskOrder: [], tasks: [] })
    setBoardData(boardDataTemp)
  }, [boardData])
  return (
    <div className="board-container">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        dragHandleSelector=".column-drag-handle"
        nonDragAreaSelector=".dropdown-header-wrapper"
        animationDuration={500}
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'drop-preview'
        }}
        dragClass="on-drag-column"
        dropClass="on-drop-column"
      >
        {renderColumn}
      </Container>
      <AddNewColumn onAddColumn={onAddColumn} />
    </div>
  )
}

const mapStateToProps = ({ board }) => ({
  columnUpdated: board.columnUpdated,
  columnDeleted: board.columnDeleted,
  taskAdded: board.taskAdded
})
// const mapDispatchToProps = {}
export default connect(mapStateToProps, null)(BoardContainer)
