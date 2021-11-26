const getUniqueLetters = (quoteContent: string) => {
  const filtered: string[] = []
  quoteContent.split("").map((letter) => {
    if (!filtered.includes(letter.toLowerCase()) && letter.match(/[a-zA-Z]/)) {
      filtered.push(letter.toLowerCase())
    }
    return letter
  })
  return filtered.length
}
export default getUniqueLetters
