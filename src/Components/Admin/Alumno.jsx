import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Document, Page, pdfjs} from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import {useState, useEffect} from 'react';
import {faCalendar, faTemperature1} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'

const Alumno = () => {

    const [file,setFile] = useState('');
    const {numControl} = useParams();

    const crearFecha = f =>{

        // Creamos array con los meses del año
        const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
        // Creamos array con los días de la semana
        const dias_semana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

        const date = new Date(f);

        const fecha = dias_semana[date.getDay()] + ', ' + (date.getDate()+1) + ' de ' + meses[date.getMonth()] + ' de ' + date.getUTCFullYear();
        
        return fecha;

    }

    const icon = (i) => <span className="icon is-small"><FontAwesomeIcon icon={i} /></span>

    const navigate = useNavigate();

    const [numPages,setNumPages] = useState(null);
    const [pageNumber, setPageNumer] = useState(1);
    const [user,setUser] = useState(null);
    const [temperatura, setTemperatura] = useState([]);
    
    const onLoadSuccess = ({numPages})=>{
        setNumPages(numPages);
    }

    const subrayado = (i) => <span className='has-text-warning' style={{'text-decoration':'underline'}}>{i}</span>

    const btnEnfermo = async () =>{

        try {
            
            await axios.put(`http://localhost:4000/api/alumno/enfermo/${numControl}`);
            
            const newUser = usuario;
            newUser.enfermo = true;
            setUser(newUser);
            alert(`El alumno ${user.nombre} se ha marcado como enfermo.`)

        } catch (error) {
            alert('Hubo un error');

        }

    }

    useEffect(async()=>{
        try {
            const data = await(await fetch(`http://localhost:4000/api/temperatura/${numControl}`)).json()
            setFile(`http://localhost:4000/${data.alumno.numControl}.pdf`);
            setUser(data.alumno);
            setTemperatura(data.temperaturas);
            
        } catch (error) {
            alert(data.msg);
            navigate('/admin');
            console.log(error)
        }
        
    },[])

    return ( 
        <>

            <div className='container my-5 box'>

                <div class="notification is-info has-text-centered">
                   
                    {
                        user ? <p> El alumno {subrayado(user.nombre)}, de la carrera {subrayado(user.carrera)} </p> :
                        user && user.certificado ? <p>
                            se aplico la vacuna {subrayado(user.tVacuna)} en la fecha: {subrayado(crearFecha(user.fVacuna))}
                        </p>
                        : null
                    }

                    {
                        user && user.enfermo ? 
                        <p className='button is-danger my-2'>Se encuentra enfermo</p> : null
                    }

                    {user && !user.enfermo ?
                        <button
                            onClick={btnEnfermo} 
                        className='button is-danger my-2'>Marcar con sintomas</button>
                        : null
                    }
                </div>

                <div className='is-flex is-jusfity-content-start'>
                    <button
                        onClick={()=> navigate('/admin')}
                    type='button' className='button is-success my-2'>&laquo; Volver</button>
                </div>

                <div>
                    <table className='table is-hoverable is-fullwidth mx-auto'>
                        <thead>
                            <tr>
                                <th>{icon(faCalendar)}Fecha</th>
                                <th>{icon(faTemperature1)}Temperatura</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                temperatura.map((temp,i)=>(
                                    <tr key={temp._id}>
                                        <td>{crearFecha(temp.fecha)}</td>
                                        <td>{temp.temperatura}</td>
                                    </tr>
                                ))
                            }
                            
                        </tbody>
                    </table>
                </div>

                <div className='box'>
                    <span className='tag is-warning is-light is-medium'>Certificado</span>

                    
                    <Document file={file} onLoadSuccess={onLoadSuccess}>
                        <Page pageNumber={pageNumber}/>
                    </Document>

                    <p className='has-text-centered'>
                        {pageNumber == 1 ? null :
                        <button className='button is-info is-small mx-2' onClick={()=>setPageNumer(pageNumber - 1)}>&laquo;</button>
                        }
                        Pagina {pageNumber} de {numPages}
                        {pageNumber == numPages ? null : 
                        <button className='button is-info is-small mx-2' onClick={()=>setPageNumer(pageNumber + 1)}>&raquo;</button>
                        }
                     </p>

                </div>

            </div>
        </>
     );
}
 
export default Alumno;