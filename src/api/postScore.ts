import axios from "axios"

const URL =
  "https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores"

export type EndGameData = {
  qouteId: string
  length: number
  uniqueCharacters: number
  userName: string
  errors: number
  duration: number
}
const postScore = async (data: EndGameData) => {
  return axios.post(URL, data).then((res) => res)
}
export default postScore
