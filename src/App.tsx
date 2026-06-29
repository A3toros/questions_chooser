import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ChoosingPage } from './pages/ChoosingPage'
import { LeaderboardPage } from './pages/LeaderboardPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChoosingPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
    </BrowserRouter>
  )
}
