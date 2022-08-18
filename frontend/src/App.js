import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

function App() {
  const { auth, loading } = useAuth();

  console.log(loading);
  if (loading) {
    return <p>Carregando ...</p>;
  }

  return (
    <div className='App'>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route
            path='/'
            element={auth ? <Home /> : <Navigate to='/login' />}
          />
          <Route
            path='/login'
            element={auth ? <Navigate to='/home' /> : <Login />}
          />
          <Route
            path='/register'
            element={auth ? <Navigate to='/home' /> : <Register />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
