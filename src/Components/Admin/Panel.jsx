import Tabs from '../Layout/Tabs'
import Alumnos from './Alumnos'
import Charts from './Charts'
import Contagios from './Contagios';
import {useContext, useEffect} from 'react';
import { PaginaContext } from '../../Context/Pagina/PaginaContext';
import authContext from '../../Context/auth/authContext';
import { useNavigate } from 'react-router-dom';

const PanelAdmin = () => {
    const navigate = useNavigate()

    const {pagina} = useContext(PaginaContext);
    const {usuario} = useContext(authContext);

    useEffect(()=>{

        try {
            if(usuario.maestro){
                console.log('es maestro')
            }
        } catch (error) {
            navigate('/')
        }

    },[])

    return ( 
        <>
            <Tabs/>

            {pagina == 0 ?
                <Alumnos/>:
                pagina === 2 ?
                <Charts/> :
                pagina == 1 ?
                <Contagios/> : 
                `Error 404`
            }


            
        </>
     );
}
 
export default PanelAdmin;