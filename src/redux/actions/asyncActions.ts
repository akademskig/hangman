import { Dispatch } from "react"
import { AnyAction } from "redux"
import { getQuote } from "../../api/getQuote"
import getScores from "../../api/getScores"
import postScore from "../../api/postScore"
import getUniqueLetters from "../../utils/getUniqueLetters"
import { StoreShape } from "../store"
import actionTypes from "./actionTypes"

export function fetchScores() {
  return (dispatch: Dispatch<AnyAction>) => {
    return getScores().then((res) => {
      dispatch({ type: actionTypes.GET_SCORES, payload: { scores: res.data } })
    })
  }
}
export function startNewGame() {
  return (dispatch: Dispatch<AnyAction>) => {
    return getQuote().then(({ content, author, _id }) => {
      dispatch({
        type: actionTypes.START_GAME,
        payload: { quoteData: { content, author, _id } },
      })
    })
  }
}

export function endGame(errors: number) {
  return (dispatch: Dispatch<AnyAction>, getState: () => StoreShape) => {
    const { game } = getState()
    return postScore({
      errors,
      userName: game.name,
      qouteId: game.quoteData._id,
      length: game.quoteData.content.length,
      uniqueCharacters: getUniqueLetters(game.quoteData.content),
      duration: Date.now() - game.startTime,
    })
      .then(() => {
        dispatch({ type: actionTypes.END_GAME, payload: { endGame: { errors } } })
      })
      .catch(() => dispatch({ type: actionTypes.END_GAME_ERROR }))
  }
}
