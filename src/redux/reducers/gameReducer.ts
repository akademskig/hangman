import { AnyAction } from "redux"
import { EndGameData } from "../../api/postScore"
import getUniqueLetters from "../../utils/getUniqueLetters"
import actions from "../actions/actionTypes"

export type GameState = {
  name: string
  gameId: string | null
  quoteData: {
    _id: string & null
    author: string
    content: string
    quoteLength: number
    uniqueLetters: number
  }
  startTime: number
  endGameData: EndGameData & { gameId: string | null }
  error: boolean
}

const initialState = {
  name: "",
  gameId: null,
  quoteData: {
    _id: null,
    author: "",
    content: "",
    quoteLength: 0,
    uniqueLetters: 0,
  },
  startTime: 0,
  endGameData: {
    userName: "",
    quoteLength: 0,
    uniqueLetter: 0,
    solvingTime: 0,
    errors: 0,
  },
  error: false,
}

function gameReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case actions.SET_NAME:
      const name = action?.payload.name
      return {
        ...state,
        name,
      }
    case actions.START_GAME:
      const { _id, author, content } = action?.payload.quoteData
      return {
        ...state,
        gameId: _id,
        quoteData: {
          _id,
          author,
          content,
          quoteLength: content.length,
          uniqueLetters: getUniqueLetters(content),
        },
        endGameData: initialState.endGameData,
        error: false,
        startTime: Date.now(),
      }
    case actions.END_GAME:
      return {
        ...state,
        endGameData: {
          gameId: state.gameId,
          userName: state.name,
          errors: action?.payload?.endGame?.errors,
          length: state.quoteData.quoteLength,
          uniqueCharacters: state.quoteData.uniqueLetters,
          duration: Date.now() - state.startTime,
        },
      }
    case actions.END_GAME_ERROR:
      return {
        ...state,
        error: true,
      }

    default:
      return state
  }
}
export default gameReducer
