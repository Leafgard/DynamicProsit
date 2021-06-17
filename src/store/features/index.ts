import { combineReducers } from 'redux'

import error from './error'
import prosit from './prosit'

const rootReducer = combineReducers({
  error,
  prosit
})

export type RootState = ReturnType<typeof rootReducer>

export {
  rootReducer
}
