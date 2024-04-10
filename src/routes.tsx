import Login from './pages/login'
import UserIndex from './pages/user'

export const routes = [
  { path: "user", element: <UserIndex /> },
  { path: "login", element: <Login /> },
  { path: "/", element: <div  children="123"/> },
]