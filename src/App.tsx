import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ChoosingPage } from './pages/ChoosingPage'
import { LeaderboardPage } from './pages/LeaderboardPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PhotosPage } from './pages/PhotosPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChoosingPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/photos" element={<PhotosPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
