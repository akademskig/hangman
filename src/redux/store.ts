import { createStore, applyMiddleware, combineReducers } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import thunkMiddleware from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import gameReducer, { GameState } from "./reducers/gameReducer"
import scoresReducer, { ScoreState } from "./reducers/scoresReducer"


const persistConfig = {
  key: "root",
  storage,
}

const rootReducer = combineReducers({
  game: gameReducer,
  scores: scoresReducer,
})

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
const persistedReducer = persistReducer(persistConfig, rootReducer)

export type StoreShape = {
  game: GameState
  scores: ScoreState
}

let store = createStore(persistedReducer, composedEnhancer)

let persistor = persistStore(store)
export { store, persistor }

export default store
