import { AnyAction } from "redux"
import actionTypes from "../actions/actionTypes"

export type ScoreState = {
  scores: any[]
}

function scoresReducer(
  state: ScoreState = { scores: [] },
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
