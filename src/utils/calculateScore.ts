type Params = {
  errors: number
  length: number
  uniqueCharacters: number
  duration: number
}

const calculateScore = ({
  errors,
  length,
  uniqueCharacters,
  duration,
}: Params) => {
  return Math.round(100 / (1 + errors))
}
export default calculateScore
