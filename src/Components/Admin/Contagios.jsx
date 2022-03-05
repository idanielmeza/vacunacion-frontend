import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarWeek, faSyringe , faIdCard, faGraduationCap, faArrowUp19} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';

const Contagios = ()=> {

    const navigate = useNavigate();    

    const icon = (i) => <span className="icon is-small"><FontAwesomeIcon icon={i} /></span>

    const crearFecha = f =>{

        // Creamos array con los meses del año
        const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
        // Creamos array con los días de la semana
        const dias_semana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

        const date = new Date(f);

        const fecha = dias_semana[date.getDay()] + ', ' + (date.getDate()+1) + ' de ' + meses[date.getMonth()] + ' de ' + date.getUTCFullYear();
        
        return fecha;

    }

    const [users,setUser] = useState([]);

    useEffect(async()=>{

        const info = await (await fetch('http://localhost:4000/api/alumno/enfermo')).json()

        setUser(info)

    },[])

    return (

        <>

        <table className='table is-hoverable is-fullwidth mx-auto'>
            <thead>
                <tr>
                    <th><abrr title='Numero de Control'>{icon(faIdCard)} NC</abrr></th>
                    <th><abrr title='Carrera'>{icon(faGraduationCap)}Carrera</abrr></th>
                    <th><abrr title='Semestre'>{icon(faArrowUp19)}Semestre</abrr></th>
                    <th><abrr title='Fecha de Vacunacion'>{icon(faCalendarWeek)}Vacunacion</abrr></th>
                    <th><abrr title='Tipo de Vacuna'>{icon(faSyringe)}Vacuna</abrr></th>
                </tr>
            </thead>
            <tbody>
                {users.map(user=>(
                <tr>
                    <td>
                        <a 
                            onClick = {()=> navigate(`/alumnos/${user.numControl}`)}
                            className='button is-danger is-small'>
                            {user.numControl}
                        </a>
                    </td>
                    <td>{user.carrera}</td>
                    <td>{user.semestre}</td>
                    <td>{user.fVacuna ? crearFecha(user.fVacuna) : null}</td>
                    <td>{user.tVacuna}</td>
                </tr>
                        
                ))}
                
            </tbody>
        </table>
        </>
      );
}
 
export default Contagios;