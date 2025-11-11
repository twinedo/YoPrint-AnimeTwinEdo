import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from './App'
import DetailPage from './pages/DetailPage'
import SearchPage from './pages/SearchPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <SearchPage /> },
      { path: 'anime/:id', element: <DetailPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])
