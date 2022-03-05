import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { Home } from "./components/route-specific/Home"
import { Stats } from "./components/route-specific/Stats"
import "./styles/App.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:shortId/stats" element={<Stats />} />
      </Routes>
    </Router>
  )
}

export default App
