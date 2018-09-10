import { createStore, compose, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers/index'
import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware()

const composeSetup = process.env.NODE_ENV !== 
  'production' && typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

export default createStore(
  rootReducer,
  composeSetup(),
  applyMiddleware(sagaMiddleware, logger)
)

sagaMiddleware.run(sagas)