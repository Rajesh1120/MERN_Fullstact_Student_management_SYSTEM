
import './App.css';
import RegisterForm from './components/Logins/registerForm';
import {Routes,Route} from 'react-router-dom'
import LoginForm from './components/Logins/signin';
import Home from './components/pages/Home';
import ProtectedRoute from './components/Logins/ProtectedRoute';
import NavBar from './components/NavBar/NavBar';
import StudentForm from './components/pages/AddStudent';
import Edit from './components/pages/Edit';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path='/home' element={
                                      <ProtectedRoute>
                                        <NavBar />
                                        <Home />
                                      </ProtectedRoute>
                                    }/>
      <Route path="/add-student" element={
        <ProtectedRoute><StudentForm /></ProtectedRoute>
      
      } />
      <Route path="/edit/:id" element={
        <ProtectedRoute><Edit  /></ProtectedRoute>
      
      } />

    </Routes>
      
    </>
  );
}

export default App;
