const { createSlice } = require('@reduxjs/toolkit')

const loadingSlice = createSlice({
  name: 'progress',
  initialState: { value: 0 },
  reducers: {
    setProgress(state, { payload }) {
      return { value: payload }
    }
  }
})

export const { setProgress } = loadingSlice.actions

export default loadingSlice.reducer