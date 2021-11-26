import classNames from "classnames"
import { useCallback, useEffect, useState } from "react"
import { connect, useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { endGame, startNewGame } from "../../redux/actions/asyncActions"
import { GameState } from "../../redux/reducers/gameReducer"
import { letters } from "../../constants/alphabet"
import styles from "./Hangman.module.scss"
import { BiRotateRight } from "react-icons/bi"

const checkIfHidden = (l: string) => {
  return l.match(/[a-zA-Z\w]/gi)
}
const Hangman = ({
  quoteData,
  name,
  gameEnded,
  error,
}: Pick<GameState, "quoteData" | "name" | "error"> & {
  gameEnded: boolean
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [matchedLetters, setMatchedLetters] = useState<string[]>([])
  const [clickedLetters, setClickedLetters] = useState<string[]>([])
  const [errorCount, setErrorCount] = useState(0)
  const [loading, setLoading] = useState(false)

  const getQuote = useCallback(
    async ({ restart }: { restart?: boolean } = {}) => {
      if (quoteData && quoteData._id && !restart) {
        return
      }
      setLoading(true)
      await dispatch(startNewGame())
      setLoading(false)
    },
    [dispatch, quoteData]
  )

  useEffect(() => {
    if (!name) {
      navigate("/")
    }
    getQuote()
  }, [getQuote, name, navigate])

  useEffect(() => {
    gameEnded && navigate("/scoreboard")
  }, [gameEnded, navigate])

  const onLetterClick = useCallback(
    async (e) => {
      const letter = e.target.value
      const lettersArray = quoteData?.content?.split("")
      const found = lettersArray.find(
        (qLetter: string) => qLetter.toLowerCase() === letter.toLowerCase()
      )
      if (!found) {
        setClickedLetters([...clickedLetters, letter.toLowerCase()])
        setErrorCount(errorCount + 1)
      } else {
        setMatchedLetters([...matchedLetters, letter.toLowerCase()])
        setClickedLetters([...clickedLetters, letter.toLowerCase()])
        if (
          quoteData.uniqueLetters ===
          [...matchedLetters, letter.toLowerCase()].length
        ) {
          dispatch(endGame(errorCount))
        }
      }
    },
    [
      clickedLetters,
      dispatch,
      errorCount,
      matchedLetters,
      quoteData?.content,
      quoteData.uniqueLetters,
    ]
  )

  const restart = useCallback(() => {
    getQuote({ restart: true })
    setClickedLetters([])
    setMatchedLetters([])
    setErrorCount(0)
  }, [getQuote])

  return (
    <div className={styles.root}>
      <h2>Good luck {name}!</h2>
      <p> a quote by {quoteData?.author}</p>
      <div className={styles.errorCounter}>
        <span>Errors: </span>
        <span className={styles.errorNum}>{errorCount}</span>
      </div>
      <button className={styles.restartBtn} onClick={restart}>
        Restart <BiRotateRight size={20}/>
      </button>
      {error && <div className={styles.error}> An error occured </div>}

      <div className={styles.lettersRoot}>
        {!loading && (
          <div className={styles.lettersContainer}>
            {quoteData &&
              (quoteData?.content?.split("") || []).map(
                (letter: string, idx: number) => {
                  return (
                    <div
                      key={idx}
                      className={classNames(styles.letterWrapper, {
                        [styles.space]: letter === " ",
                      })}
                    >
                      <span
                        className={classNames(styles.letter, {
                          [styles.hidden]:
                            checkIfHidden(letter.toLowerCase()) &&
                            matchedLetters.indexOf(letter.toLowerCase()) === -1,
                        })}
                      >
                        {letter}
                      </span>
                    </div>
                  )
                }
              )}
          </div>
        )}
        {loading && (
          <div className={styles.loaderRoot}>
            <div className={styles.loader} />
          </div>
        )}
      </div>
      <div className={styles.keyboard}>
        {letters.map((letter, idx) => {
          return (
            <button
              key={idx}
              className={classNames(styles.keyboardLetter, {
                [styles.disabled]: clickedLetters.indexOf(letter) !== -1,
              })}
              disabled={clickedLetters.indexOf(letter) !== -1}
              value={letter}
              onClick={onLetterClick}
            >
              {" "}
              {letter}
            </button>
          )
        })}
      </div>
    </div>
  )
}
const mapStateToProps = ({
  game: { quoteData, name, error, gameId, endGameData },
}: {
  game: GameState
}) => ({
  quoteData,
  name,
  error,
  gameEnded: gameId === endGameData.gameId,
})
export default connect(mapStateToProps)(Hangman)
