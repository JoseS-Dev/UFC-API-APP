import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Landing } from './Pages/Landing';
import { Login } from './Pages/Login-Register/Login';
import { Register } from './Pages/Login-Register/Register';
import { ProtectedUser } from './components/ProtectedUser';
import { ProtectedAdmin } from './components/ProtectedAdmin';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Register' element={<Register/>}/>
        { /* Rutas protegidas para usuarios autenticados*/ }
        <Route element={<ProtectedUser/>}></Route>
        { /* Rutas protegidas para administradores */ }
        <Route element={<ProtectedAdmin/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
