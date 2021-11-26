import { Route, Routes } from "react-router"
import Hangman from "./pages/Hangman"
import ScoreBoard from "./pages/ScoreBoard"
import StartPage from "./pages/StartPage"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StartPage/>}/>
      <Route path="/hangman" element={<Hangman/>}/>
      <Route path="/scoreboard" element={<ScoreBoard/>}/>
    </Routes>
  )
}

export default AppRoutes
