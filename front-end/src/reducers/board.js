const { createSlice } = require('@reduxjs/toolkit')

const mainBoardSlice = createSlice({
  name: 'board',
  initialState: {
    columnOpenAddTask: null,
    columnUpdated: null,
    columnDeleted: null,
    taskAdded: null,
    boardSelected: {
      id: '619230933d6074eea5feed0c'
    }
  },
  reducers: {
    updateTitleColumn(state, { payload }) {
      return { ...state, columnUpdated: { ...payload } }
    },
    openAddTask(state, { payload }) {
      return { ...state, columnOpenAddTask: { ...payload } }
    },
    deleteColumn(state, { payload }) {
      return { ...state, columnDeleted: { ...payload } }
    },
    addTask(state, { payload }) {
      const { isOnTop = false } = state.columnOpenAddTask
      return { ...state, taskAdded: { ...payload, isOnTop } }
    },
    setBoardSelectedId(state, { payload }) {
      const boardSelected = { id: payload }
      return { ...state, boardSelected }
    },
    setBoardSelectedData(state, { payload }) {
      return { ...state, boardSelected: { ...payload } }
    }
  }
})

export const { updateTitleColumn, deleteColumn, openAddTask, addTask, setBoardSelectedId, setBoardSelectedData } = mainBoardSlice.actions

export default mainBoardSlice.reducer