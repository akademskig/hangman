type Params = {
  errors: number
  quoteLength: number
  uniqueLetters: number
  solvingTime: number
}

const calculateScore = ({
  errors,
  quoteLength,
  uniqueLetters,
  solvingTime,
}: Params) => {
  return Math.round(100 / (1 + errors))
}
export default calculateScore
