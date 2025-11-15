import React from 'react'
import Home from './Components/Home/Home'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Cakes from './Components/Cakes/Cakes'
import Cookies from './Components/Cookies/Cookies'
import Breads from './Components/Breads/Breads'
import AllProducts from './Components/AllProducts/AllProducts'

const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home/>
    },
    {
      path: '/Cakes',
      element: <Cakes/>
    },
    {
      path: '/Cookies',
      element: <Cookies/>
    },
    {
      path: '/Breads',
      element: <Breads/>
    },
    {
      path: '/AllProducts',
      element: <AllProducts/>
    },
])
  return <RouterProvider router={router}/>
}

export default App
