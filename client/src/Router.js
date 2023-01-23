import { Navigate, useRoutes, useSearchParams, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Friends from './pages/Friends';
import Find from './pages/Find';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import ProfileView from './pages/ProfileView';
import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';

export default function Router() {

  const routes = [
    {
      path: '/',
      children: [
        { path: '/', element: <PrivateRoute><Home /></PrivateRoute> },
        { path: '/friends', element: <PrivateRoute><Friends /></PrivateRoute> },
        { path: '/find', element: <PrivateRoute><Find /></PrivateRoute> },
        { path: '/login', element: <PublicRoute><Login /></PublicRoute>},
        { path: '/register', element: <PublicRoute><Register /></PublicRoute> },
        { path: '/profile', element: <PrivateRoute><Profile /></PrivateRoute> },
        { path: '/profile/:id', element: <PrivateRoute><ProfileView /></PrivateRoute> },
        { path: '/chat/:id', element: <PrivateRoute><Chat /></PrivateRoute> },
      ],
    },
    { path: '*', element: <Navigate to="/login" replace /> },
  ]

  return useRoutes(routes);
}