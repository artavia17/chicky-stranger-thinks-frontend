import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../components/layout';
import { Awards, Home, NotFound, Profile } from '../pages';
import Register from '../pages/Register';
import PromotionalCode from '../pages/PromotionalCode';
import Winners from '../pages/Winners';

/**
 * Configuración de rutas de la aplicación
 * Utiliza React Router v7 con createBrowserRouter
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'registrate',
        element: <Register />,
      },
      {
        path: 'ingresar-codigos',
        element: <PromotionalCode />,
      },
      {
        path: 'ganadores',
        element: <Winners />,
      },
      {
        path: 'mi-perfil',
        element: <Profile />,
      },
      {
        path: 'premios',
        element: <Awards />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
