import React,{useReducer} from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import axios from 'axios';


const AuthState = ({children}) => {

    const initialState = {
        token: localStorage.getItem('user-token'),
        autenticado: null,
        usuario: null,
        cargando: true,
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const autenticar = datos =>{
        try {
            const {usuario, token} = datos;

            dispatch({
                type: 'LOGIN',
                payload: {
                    token : token,
                    usuario
                }
            });            

        } catch (error) {
            alert('No se pudo iniciar sesion, intentalo de nuevo');
            console.log(error);
        }

    }

    const logout = ()=>{

        localStorage.removeItem('user-token');

        dispatch({
            type: 'LOGUT'
        })

    }

    const obtenerUsuario = async()=>{

        const userToken = localStorage.getItem('user-token');

        try {
            const resp = await axios.get('http://localhost:4000/api/auth',{
            headers:{'user-token': userToken}
            })

            const {usuario, token} = resp.data;

            autenticar({usuario,token});

            return true;

        } catch (error) {
            
            console.log(error.response);
            return false;
        }    

    }

    const usuarioEnfermo = usuario =>{

        dispatch({
            type: 'ENFERMO',
            payload: usuario
        })

    }


    return (
        <AuthContext.Provider
            value={{
                autenticar,
                logout,
                obtenerUsuario,
                usuarioEnfermo,
                autenticado: state.autenticado,
                token: state.token,
                usuario: state.usuario,
                cargando: state.cargando
            }}
        >
            {children}
        </AuthContext.Provider>
    )

}

export default AuthState;