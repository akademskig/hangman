import { AnyAction } from "redux"
import actionTypes from "../actions/actionTypes"

export type ScoreState = {
  myScore: number
  scores: any[]
}

function scoresReducer(
  state: ScoreState = { scores: [], myScore: 0 },
  action: AnyAction
) {
  switch (action.type) {
    case actionTypes.GET_SCORES:
      return {
        ...state,
        scores: action.payload.scores,
      }

    default:
      return state
  }
}
export default scoresReducer
