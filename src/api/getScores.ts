import axios from "axios"

const URL =
  "https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores"

const getScores = async () => {
  return axios.get(URL).then((res) => res)
}
export default getScores
