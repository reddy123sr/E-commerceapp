
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import ProdDetails from './components/ProdDetails'
import Cart from './components/Cart'
import { CartProvider } from './components/CartContext'
import Checkout from './components/Checkout'
import Signup from './components/Signup'
import Login from './components/Login'
import Profile from './components/Profile'
import MyOrders from './components/MyOrders'
import ProtectedRoute from './components/ProtectRoute'
import Wishlist from './components/Wishlist'
const router=createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/about",
        element:<About/>
      },
      {
        path:"/contact",
        element:<Contact/>
      },
      {
        path:"/product/:id",
        element:<ProdDetails/>
      },
      {
        path:"/cart",
        element:<Cart/>
      },
      {
        path:"/checkout",
        element:<Checkout/>
      },
      {
        path:"/signup",
        element:<Signup/>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/profile",
        element:<Profile/>
      },
      {
        path:"/wishlist",
        element:<Wishlist/>
      },
      {
        element: <ProtectedRoute />,  // Protecting these routes
        children: [
          { path: "/cart", element: <Cart /> },
          { path: "/profile", element: <Profile /> },
        ],
      },
      { path: "/myorders", element: <MyOrders /> },
    ]
  }
])

function App() {
  return (
  <CartProvider>
  <RouterProvider router={router}/>
  </CartProvider>
  );
};

export default App;
