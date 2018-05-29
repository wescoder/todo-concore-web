import { combineReducers, createStore } from 'redux'

import app from './app'
import auth from './auth'
import todo from './todo'

export const rootReducer = {
  app,
  auth,
  todo
}

export const makeStore = initialState => createStore(
  combineReducers(rootReducer),
  initialState,
  (process.browser && window.__REDUX_DEVTOOLS_EXTENSION__)
    && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default makeStore
