import {useContext,useEffect} from 'react';
import AuthContext from '../../Context/auth/authContext';
import {Navigate, useNavigate} from 'react-router-dom';

const PrivateRoute = ({children}) => {

    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const {obtenerUsuario, usuario, autenticado, cargando} = authContext;

    useEffect(async()=>{
        if(!usuario){
           const resp = await obtenerUsuario();
           if(!resp){
               navigate('/auth/login')
           }
        }
    },[autenticado])

    return ( 

        !autenticado && !cargando ?(
            <Navigate to='auth/login'/>
        ) : (
            children
        ) 

     );
    
}

export default PrivateRoute;