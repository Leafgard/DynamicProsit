import { getDefaultMiddleware } from '@reduxjs/toolkit'
import { applyMiddleware, compose, createStore, Middleware } from 'redux'
import { createLogger } from 'redux-logger'
import { rootReducer } from './features'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const middleware: Middleware[] = [
  ...getDefaultMiddleware()
]

const isEnabled: boolean = false
if (process.env.NODE_ENV !== 'production' && isEnabled) {
  middleware.push(
    createLogger({
      collapsed: true
    })
  )
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?? compose

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(...middleware)
))

export {
  store
}
