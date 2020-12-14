import { createStore, compose, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducer'
import {
  sayHiOnDispatch,
  includeMeaningOfLife,
} from './exampleAddons/enhancers'
import {
  print1,
  print2,
  print3,
  loggerMiddleware,
  alwaysReturnHelloMiddleware,
  delayedMessageMiddleware,
} from './exampleAddons/middleware'

let preloadedState
const persistedTodosString = localStorage.getItem('todos')

if (persistedTodosString) {
  preloadedState = {
    todos: JSON.parse(persistedTodosString),
  }
}

// const middlewareEnhancer = applyMiddleware(
//   print1,
//   print2,
//   print3,
//   loggerMiddleware,
//   alwaysReturnHelloMiddleware,
//   delayedMessageMiddleware
// )

const composedEnhancer = composeWithDevTools(
  // EXAMPLE: Add whatever middleware you actually want to use here
  applyMiddleware(print1, print2, print3)
  // other store enhancers if any
)

// const composedEnhancer = compose(sayHiOnDispatch, includeMeaningOfLife)

//const store = createStore(rootReducer, preloadedState, composedEnhancer)

// Pass enhancer as the second arg, since there's no preloadedState
const store = createStore(rootReducer, composedEnhancer)

export default store
