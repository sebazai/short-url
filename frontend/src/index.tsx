import React from "react"
import ReactDOM from "react-dom"
import "./styles/index.css"
import App from "./App"
import { Toaster } from "react-hot-toast"

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Toaster position="bottom-center"/>
  </React.StrictMode>,
  document.getElementById("root"),
)
