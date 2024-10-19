import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"  // Import Provider from react-redux
import store from "./store"  // Import your Redux store
import App from "./App"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Provider store={store}>  {/* Wrap the app with Provider */}
      <App />
    </Provider>
  </React.StrictMode>
)
