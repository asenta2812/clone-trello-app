const { createSlice } = require('@reduxjs/toolkit')

const mainBoardSlice = createSlice({
  name: 'board',
  initialState: {
    columnOpenAddTask: null,
    columnUpdated: null,
    columnDeleted: null,
    taskAdded: null
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
    }
  }
})

export const { updateTitleColumn, deleteColumn, openAddTask, addTask } = mainBoardSlice.actions

export default mainBoardSlice.reducer