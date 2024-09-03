import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CreateUser } from './pages/CreateClient.tsx'
import { ListClient} from './pages/ListClient.tsx'
import { UpdateClient } from './pages/UpdateClient.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<CreateUser/>} />
          <Route path="/update-client/:id" element={<UpdateClient/>} />
          <Route path="/list-client" element={<ListClient/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
