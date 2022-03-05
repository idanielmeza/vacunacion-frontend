import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLock, faIdCard } from '@fortawesome/free-solid-svg-icons'
import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../Context/auth/authContext';

const Login = () => {

    const authContext = useContext(AuthContext);
    const {autenticar} = authContext;

    const navigate = useNavigate();

    const icon = (i) => <FontAwesomeIcon icon={i} />

    const [user,setUser] = useState({
        tipo: 'alumno'
    });

    const handleChange = e=>{
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async e=>{
        e.preventDefault();

        const {numControl,tipo, password} = user;

        if(!numControl || !password){
            return alert('Todos los campos son obligatorios')
        }

        try {
            
            const resp = await axios.post('http://localhost:4000/api/auth/login', user);

            const {token,usuario} = resp.data;

            localStorage.setItem('user-token', token)
            
            autenticar({token,usuario});

            if(usuario.maestro){
                navigate('/admin');
            }else{
                navigate('/');
            }

            

        } catch (error) {
            alert(error.response.data.mgs)
        }



    }


    return ( 
        <div className='my-5 container'>
            
            <h2 className='title mx-5'>Bienvenido a VanucaTec</h2>
            
            <form 
                onSubmit={handleSubmit}
            className='box'>
                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                        <input
                            onChange={handleChange}
                        name='numControl' className="input" type="text" placeholder="Numero de control"/>
                        <span className="icon is-small is-left">
                        {icon(faIdCard)}
                        </span>

                    </p>
                    </div>
                    <div className="field">
                    <p className="control has-icons-left">
                        <input 
                            onChange={handleChange}
                        name='password' className="input" type="password" placeholder="Contrasena"/>
                        <span className="icon is-small is-left">
                        {icon(faLock)}
                        </span>
                    </p>
                    </div>
                    <div className="field is-flex is-justify-content-end">
                    <p className='select mx-2 '>
                        <select
                            onChange={handleChange}
                        name='tipo'>
                            <option value='alumno'>Alumno</option>
                            <option value='admin'>Administracion</option>
                        </select>
                    </p>
                    <p className="control">
                        <input
                        className="button is-link" type='submit' value='Conectar'/>
                    </p>
                </div>
            </form>

        </div>
     );
}
 
export default Login;