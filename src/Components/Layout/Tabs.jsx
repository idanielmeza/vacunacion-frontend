import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser, faCircleRadiation, faArrowRightFromBracket , faChartColumn} from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react';
import { PaginaContext } from '../../Context/Pagina/PaginaContext';
import authContext from '../../Context/auth/authContext';
import { useNavigate } from 'react-router-dom';

const Tabs = () => {

    const navigate = useNavigate();

    const {pagina,setPagina} = useContext(PaginaContext);
    const {logout} = useContext(authContext);

    const icon = (i) => <FontAwesomeIcon icon={i} />

    return (  
        <div className="tabs is-boxed container my-5 is-centered">
            <ul>
                <li className={pagina == 0 ? 'is-active' : null}>
                    <a
                        onClick={()=>{
                            setPagina(0)
                        }}
                    >
                        <span className="icon is-small">{icon(faUser)}</span>
                        <span>Alumnos</span>
                    </a>
                </li>
                
                <li className={pagina == 1 ? 'is-active' : null}>
                    <a
                        onClick={()=>{
                            setPagina(1)
                        }}
                    >
                        <span className="icon is-small">{icon(faCircleRadiation)}</span>
                        <span>Posibles Contagios</span>
                    </a>
                </li>

                <li className={pagina == 2 ? 'is-active' : null}>
                    <a
                        onClick={()=>{
                            setPagina(2)
                        }}
                    >
                        <span className="icon is-small">{icon(faChartColumn)}</span>
                        <span>Estadisticas</span>
                    </a>
                </li>

                <li className=''>
                    <a
                        onClick={()=>{
                            logout();
                            navigate('/auth/login')
                        }}
                    >
                        <span className="icon is-small">{icon(faArrowRightFromBracket)}</span>
                        <span>Cerrar Sesion</span>
                    </a>
                </li>
                
            </ul>
        </div>
    );
}
 
export default Tabs;