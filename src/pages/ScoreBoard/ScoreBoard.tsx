import classNames from "classnames"
import { useCallback, useEffect, useMemo } from "react"
import { connect, useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { fetchScores, startNewGame } from "../../redux/actions/asyncActions"
import { StoreShape } from "../../redux/store"
import calculateScore from "../../utils/calculateScore"
import styles from "./ScoreBoard.module.scss"
import { BiArrowBack } from "react-icons/bi"

type Props = {
  endGameData: any
  scores: any[]
}

const ScoreBoard = ({ endGameData, scores }: Props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchScores())
  }, [dispatch])

  const calculatedScores = useMemo(() => {
    const scoresWithCurrent = [...scores]
    if (endGameData.gameId) {
      scoresWithCurrent.push({ ...endGameData, id: scores.length })
    }
    return scoresWithCurrent
      .map(({ id, userName, ...score }) => ({
        id,
        userName,
        score: calculateScore(score),
      }))
      .sort((a, b) => b.score - a.score)
  }, [endGameData, scores])

  const onStartNewGame = useCallback(async () => {
    await dispatch(startNewGame())
    navigate("/hangman")
  }, [dispatch, navigate])

  return (
    <div className={styles.root}>
      <button onClick={onStartNewGame} className={styles.newGameButton}>
        <BiArrowBack size={20} />
        {"New Game"}
      </button>
      <h2> Score board</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Position</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {(Array.isArray(calculatedScores) ? calculatedScores : []).map(
            (score: any, idx: number) => (
              <tr
                key={idx}
                className={classNames({
                  [styles.myScore]: score.id === scores.length,
                })}
              >
                <td>{idx + 1}</td>
                <td>{score.userName}</td>
                <td>{score.score}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = ({
  game: { name, endGameData },
  scores: { scores },
}: StoreShape) => ({
  name,
  endGameData,
  scores,
})
export default connect(mapStateToProps)(ScoreBoard)
