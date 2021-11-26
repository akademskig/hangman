import { useCallback, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import actionTypes from "../../redux/actions/actionTypes"
import { BiRightArrow } from 'react-icons/bi'
import styles from "./StartPage.module.scss"

const StartPage = () => {
  const [name, setName] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleSubmit = useCallback(() => {
    if (!name) {
      return
    }
    dispatch({ type: actionTypes.SET_NAME, payload: { name } })
    navigate("hangman")
  }, [dispatch, name, navigate])

  return (
    <div className={styles.root}>
      <form className={styles.inputRoot}>
        <label className={styles.label} htmlFor="player-name">
          Player name
        </label>
        <input
          name="player-name"
          className={styles.input}
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <button className={styles.button} onClick={handleSubmit}>
          Play <BiRightArrow/>
        </button>
      </form>
    </div>
  )
}
export default StartPage
