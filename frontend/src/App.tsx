import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Landing } from './Pages/Landing';
import { Login } from './Pages/Login-Register/Login';
import { Register } from './Pages/Login-Register/Register';
import { Home } from './Pages/Users/Home';
import { Fighters } from './Pages/Users/Fighters';
import { Legends } from './Pages/Users/Legends';
import { ProtectedUser } from './components/ProtectedUser';
import { ProtectedAdmin } from './components/ProtectedAdmin';
import { UserProvider } from './context/UserContext';

function App() {
  
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Register' element={<Register/>}/>
          { /* Rutas protegidas para usuarios autenticados*/ }
          <Route element={<ProtectedUser/>}>
            <Route path='/Home' element={<Home/>}/>
            <Route path='/Profile' />
            <Route path='/Settings'/>
            <Route path='/Fighters' element={<Fighters/>}/>
            <Route path='/Events'/>
            <Route path='/Fights'/>
            <Route path='/Legends' element={<Legends/>}/>
          </Route>
          { /* Rutas protegidas para administradores */ }
          <Route element={<ProtectedAdmin/>}>
            <Route path='/Admin/Dashboard'/>
            <Route path='/Admin/Users'/>
            <Route path='/Admin/Fighters'/>
            <Route path='/Admin/Events'/>
            <Route path='/Admin/Fights'/>
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
