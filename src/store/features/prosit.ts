import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPrositDetails, IPrositSlice } from '../../types/prosit.types'

const initialState: IPrositSlice = {
  details: {
    title: '',
    link: '',
    generalization: '',
    context: '',
    animator: '',
    scribe: '',
    secretary: '',
    manager: ''
  },
  keywords: [],
  constraints: [],
  problematics: [],
  solutions: [],
  deliverables: [],
  actions: []
}

const error = createSlice({
  name: 'prosit',
  initialState,
  reducers: {
    setDetails: (state, action: PayloadAction<IPrositDetails>) => {
      state.details = action.payload
    }
  }
})

export const {
  setDetails
} = error.actions

export default error.reducer
