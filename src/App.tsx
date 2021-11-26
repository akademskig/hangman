import { Provider } from "react-redux"
import "./styles/main.scss"
import AppRoutes from "./routes"
import { BrowserRouter } from "react-router-dom"
import { persistor, store } from "./redux/store"
import { PersistGate } from "redux-persist/integration/react"

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </div>
      </PersistGate>
    </Provider>
  )
}

export default App
