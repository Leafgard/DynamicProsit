import { init } from '@sentry/browser'
import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { App } from './App'

import './assets/less/App.less'
import { rendererConfig } from './config/config.renderer'
import { store } from './store'

init({ dsn: rendererConfig.SENTRY_DSN, environment: process.env.NODE_ENV })

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
