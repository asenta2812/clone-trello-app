/* eslint-disable react-hooks/exhaustive-deps */
import Column from 'components/Column'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import './index.scss'
import { isEmpty } from 'lodash'
import mapOrder from 'ultilites/sorts'
import { Container, Draggable } from 'react-smooth-dnd'
import applyDrop from 'ultilites/applyDrop'
import AddNewColumn from 'components/NewColumn'
import { connect } from 'react-redux'
import { setBoardSelectedData } from 'reducers/board'
import axios from 'ultilites/api'

function BoardContainer({ columnUpdated, columnDeleted, taskAdded, boardSelectedId, setBoardSelectedData }) {
  const [boardData, setBoardData] = useState([])

  const onDropTask = (dropResult, newColumnId) => {
    const { addedIndex, payload } = dropResult
    if (addedIndex != null) {
      const { _id: taskId, columnId: oldColumnId } = payload
      let body = {}

      const columns = boardData.columns.map(item => {
        if (oldColumnId === newColumnId && newColumnId === item._id) {
          let taskOrder = applyDrop(item.taskOrder, dropResult)
          body = { id: newColumnId, order: taskOrder }
          return { ...item, taskOrder }
        }
        if (item._id === oldColumnId) {
          const tasks = item.tasks.filter(f => f._id !== taskId)
          const taskOrder = tasks.map(f => f._id)
          body = { ...body, id_old: oldColumnId, order_old: taskOrder }
          return { ...item, tasks, taskOrder }
        }
        if (item._id === newColumnId) {
          const tasks = [...item.tasks, { ...payload, columnId: null }]
          item.taskOrder.splice(addedIndex, 0, taskId)

          body = { ...body, id_new: newColumnId, order_new: item.taskOrder }
          return { ...item, tasks }
        }
        return item
      })
      const update = async () => {
        await axios.post('columns/change-task-order', body)
      }
      update()

      setBoardData({ ...boardData, columns })
    }
  }
  useEffect(() => {
    if (!boardSelectedId) {
      return
    }
    const getData = async () => {
      const response = await axios.get('boards/' + boardSelectedId)
      setBoardData(response)
      setBoardSelectedData({ id: response?._id, name: response?.name })
    }
    getData()
  }, [boardSelectedId])

  useEffect(() => {
    if (!columnUpdated) return
    const { _id, name } = columnUpdated

    const update = async () => {
      await axios.patch(`columns/${_id}`, { name })
    }
    update()

    let columns = boardData.columns.map(item => {
      if (item._id === _id) {
        return { ...item, name: name }
      }
      return item
    })
    setBoardData({ ...boardData, columns })
  }, [columnUpdated])

  useEffect(() => {
    if (!columnDeleted) return
    const { columnId } = columnDeleted
    const deleteFunc = async () => {
      await axios.delete(`columns/${columnId}`)
    }
    deleteFunc()
    let columns = boardData.columns.filter(item => item._id !== columnId)
    let columnOrder = columns.map(m => m._id)
    setBoardData({ ...boardData, columns, columnOrder })
  }, [columnDeleted])

  useEffect(() => {
    if (!taskAdded) return

    const { columnId, isOnTop } = taskAdded

    const addTask = async () => {
      const taskCreated = await axios.post('tasks', { ...taskAdded, boardId: boardSelectedId })
      const columns = boardData.columns.map(column => {
        if (column._id === columnId) {
          let tasks = [...column.tasks]
          if (isOnTop) {
            tasks.unshift(taskCreated)
          } else {
            tasks.push(taskCreated)
          }
          return { ...column, tasks, taskOrder: tasks.map(m => m._id) }
        }
        return column
      })
      setBoardData({ ...boardData, columns })
    }

    addTask()
  }, [taskAdded])


  const renderColumn = useMemo(() => {
    if (isEmpty(boardData)) {
      return null
    }
    const columnOrdered = mapOrder(boardData.columns, boardData.columnOrder, '_id')
    return columnOrdered.map(col => <Draggable key={col._id} className="column-wrapper"><Column key={col._id} data={col} onDrop={onDropTask} /></Draggable>)
  }, [boardData])

  const onColumnDrop = (data) => {
    const columnOrder = applyDrop(boardData.columnOrder, data)
    setBoardData(old => ({ ...old, columnOrder }))
    const order = async () => {
      await axios.post(`boards/${boardSelectedId}/change-column-order`, { order: columnOrder })
    }
    order()
  }

  const onAddColumn = useCallback(async (name) => {
    if (!name) {
      return null
    }
    const columnCreated = await axios.post('columns', { name, boardId: boardSelectedId })
    const boardDataTemp = { ...boardData }
    boardDataTemp.columnOrder?.push(columnCreated._id)
    boardDataTemp.columns?.push(columnCreated)
    setBoardData(boardDataTemp)
  }, [boardData])

  return (
    <div className="board-container">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        dragHandleSelector=".column-drag-handle"
        nonDragAreaSelector=".no-wrap"
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
  taskAdded: board.taskAdded,
  boardSelectedId: board.boardSelected?.id
})
const mapDispatchToProps = {
  setBoardSelectedData
}
export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer)
