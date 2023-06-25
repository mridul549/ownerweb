import { applyMiddleware, configureStore } from '@reduxjs/toolkit'
import reducers from './reducers'
import thunk from 'redux-thunk'

export const store = configureStore(reducers, {}, applyMiddleware(thunk))