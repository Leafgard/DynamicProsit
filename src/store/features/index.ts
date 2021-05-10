import { combineReducers } from 'redux'

import error from './error'

const rootReducer = combineReducers({
  error
})

export type RootState = ReturnType<typeof rootReducer>

export {
  rootReducer
}
