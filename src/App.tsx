import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { AuthProvider } from './context/AuthContext';
import AudioPlayer from './components/AudioPlayer';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <AudioPlayer />
    </AuthProvider>
  );
}

export default App;
