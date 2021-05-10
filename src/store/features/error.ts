import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IErrorAction {
  error: Error
  eventId: string
}

export interface IErrorSlice extends Partial<IErrorAction> { }

const initialState: IErrorSlice = {
  error: undefined,
  eventId: undefined
}

const error = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<IErrorAction>) => {
      const { error, eventId } = action.payload
      state.error = error
      state.eventId = eventId
    }
  }
})

export const {
  setError
} = error.actions

export default error.reducer
