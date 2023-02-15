import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// Import our custom CSS
import './scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import Pusinex from './components/Pusinex'
import App from './App'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/pusinex', element: <Pusinex />}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
