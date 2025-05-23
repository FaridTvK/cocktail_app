
import './index.css'
import Layout from './layout/Layout'
import Home from './pages/Home'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import SelectedCat from './pages/selectedCat/SelectedCat'




export default function App() {

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout/>}>
    <Route index element={<Home/>}/>
    <Route path='/:linkParam' element={<SelectedCat/>}/>
  </Route>

))

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}


