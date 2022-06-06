import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import {useState, useEffect, useContext} from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import AuthContext from "../../Context/auth/authContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {

    const {usuario, usuarioEnfermo, logout} = useContext(AuthContext);
    const notify = (msg,type) => toast(msg,{
        type
    });
    
    const navigate = useNavigate();

    const [info,setInfo] = useState({})
    const [nameFile, setNameFile] = useState(null);
    const [file,setFile] = useState(null);

    const handleChange = (e)=>{
        setInfo({
            ...info,
            [e.target.name] : e.target.value
        })
    }

    const changeFile = e=>{
        const nombre = e.target.value.split('\\');
        setNameFile(nombre[2]);
        setFile(e.target.files[0]);
    }

    const handleSubmitInfo = async(e)=>{
        e.preventDefault();
        const {fecha,vacuna} = info;

        if(!fecha || !vacuna || !nameFile){
            notify('Completa la informacion','error');
            return;
        }

        let formData = new FormData();
        formData.append('archivo', file);
        formData.append('tVacuna', vacuna);
        formData.append('fVacuna', fecha);

        try {
            await axios.put(`http://localhost:4000/api/alumno/datos/${usuario.numControl}`,formData);

            notify('Se guardo la informacion correctamente','success');

        } catch (error) {
            notify('Hubo un error vuelve a intentarlo','error');
        }
        

    }

    const btnBien = async()=>{
        try {
            await axios.put(`http://localhost:4000/api/alumno/sano/${usuario.numControl}`);
            const newUser = usuario;
            newUser.enfermo = false;
            usuarioEnfermo(newUser);

            toast('Ya puedes regresar a clases, cuidate mucho tqm.','success')
        } catch (error) {
            notify('Hubo un error vuelve a intentarlo','error');
        }
        
        
    }

    const btnEnfermo = async () =>{

        try {
            
            await axios.put(`http://localhost:4000/api/alumno/enfermo/${usuario.numControl}`);
            
            const newUser = usuario;
            newUser.enfermo = true;
            usuarioEnfermo(newUser);

        } catch (error) {
            notify('Hubo un error','error');

        }

    }

    useEffect(()=>{

        try {
            if(usuario.maestro){
                navigate('/admin')
            }
        } catch (error) {
            console.log(error)
        }

    },[])

    return ( 

            <div className="container box">
                <ToastContainer/>

                <form
                    onSubmit={handleSubmitInfo}
                >
                <div className="notification is-info has-text-centered">
                Bienvenido {usuario ? usuario.nombre : null}, {usuario && !usuario.certificado ? 'agrega la informacion sobre tu vacunacion para mantener su acceso al plantel escolar.' : 'ya has agregado tus datos pero puedes actualizar tu informacion en cualquier momento.'}
                </div>

                <div className="field is-grouped is-grouped-centered">
                <div className="select is-flex is-flex-direction-column">
                    <label className="label">Tipo de Vacuna</label>
                    <select name='vacuna'
                        onChange={handleChange}
                    >
                        <option selected value='' disabled>Seleccionar vacuna</option>
                        <option value='Aztrazenca'>Aztrazenca</option>
                        <option value='Sputnik'>Sputnik</option>
                        <option value='Pfizer'>Pfizer</option>
                        <option value='Sinovac'>Sinovac</option>
                        <option value='Cansino'>Cansino</option>
                    </select>
                </div>

                <div className="field mx-5">
                    <label className='label'>
                        Fecha de Vacunacion
                    </label>
                    <p className="control">
                        <input
                        type='date' className='input' name='fecha'
                            onChange={handleChange}
                        />
                    </p>
                </div>

                <div className="file is-flex is-flex-direction-column">
                    <label className='label'>
                        Certificado de Vacunacion
                    </label>
                    <label className="file-label">
                        <input onChange={changeFile} className="file-input" type="file" name="file" accept='application/pdf'/>
                        <span className="file-cta">
                        <span className="file-icon">
                            <FontAwesomeIcon icon={faUpload}/>
                        </span>
                        <span className="file-label">
                            {nameFile ? `${nameFile}`.substring(0,16) + '...' : 'Seleccionar Archivo'}
                        </span>
                        </span>
                    </label>
                </div>
                </div>

                    <div className='is-flex is-justify-content-end'>

                        {!usuario || !usuario.enfermo ?
                            <button 
                                onClick={btnEnfermo}
                            type='button' className='button is-danger mx-2'>Reportarme Enfermo</button>
                        : null}
                        

                        <input className='button is-link' type='submit'
                            value={usuario && !usuario.certificado ? 'Completar': 'Actualizar'}
                        />
                    </div>

                </form>

                { usuario && usuario.enfermo ?
                    <div className="notification is-danger has-text-centered mt-5">
                        <p>
                            Se ha detectado sintomas en ultima visita a las instalaciones, por favor permanezca en casa.
                            Cuando su salud mejore marque el boton.
                        </p>
                        <button type='button' className='button is-success mt-2'
                            onClick={btnBien}
                        >Ya estoy bien!</button>
                    </div> : null
                }
                
                <div className='is-flex is-justify-content-end my-5'>
                    <button
                        onClick={()=>{
                            logout();
                            navigate('/auth/login')
                        }}
                    type='button' className='button is-danger'>Cerrar Sesion</button>
                </div>

            </div>
     );
}
 
export default Form;