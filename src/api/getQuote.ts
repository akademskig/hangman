export const getQuote = () => {
  return fetch("http://api.quotable.io/random")
    .then((res) => res.json())
}
