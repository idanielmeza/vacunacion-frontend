import {Routes, BrowserRouter, Route} from 'react-router-dom';

//Components
import Login from './Components/Auth/Login';
import Home from './Components/Home';
import PanelAdmin from './Components/Admin/Panel';
import Alumno from './Components/Admin/Alumno'
import FormTemp from './Components/Layout/FormTemp';

//Context
import PaginaProvider from './Context/Pagina/PaginaContext';

import AuthState from './Context/auth/authState';

//Ruta privada
import PrivateRoute from './Components/Routes/privateRoute';

function App() {

  return (
    
    <AuthState>

      <PaginaProvider>

        <BrowserRouter>
          <Routes>
            <Route path="/auth/login" element={<Login/>}/>
            <Route path='/' element={<PrivateRoute><Home/></PrivateRoute>}/>
            <Route path='/admin' element={<PrivateRoute><PanelAdmin/></PrivateRoute>}/>
            <Route path='/alumnos/:numControl' element={<PrivateRoute><Alumno/></PrivateRoute>}/>
            <Route path='/temperatura' element={<FormTemp/>}/>
          </Routes>
        </BrowserRouter>
        
      </PaginaProvider>

    </AuthState>
  )
}

export default App
