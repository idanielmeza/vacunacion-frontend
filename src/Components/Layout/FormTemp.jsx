import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faIdCard, faTemperature0 } from '@fortawesome/free-solid-svg-icons'
// import { clienteAxios } from '../../config/axios';
import axios from 'axios';
import {useState} from 'react';

const FormTemp = () => {

    const [info,setInfo] = useState({
        numControl: '',
        temperatura: ''
    })

    const {numControl,temperatura} = info;

    const icon = (i) => <FontAwesomeIcon icon={i} />

    const onChange = e =>{

        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();

        if(numControl == '' || temperatura == ''){
            return alert('Datos incompletos')
        }

        try {
            console.log('Entrando')
            
            // const rep =await clienteAxios('temperatura',{
            //     body:{
            //         numControl,
            //         temperatura: Number(temperatura)
            //     }
            // })

            const rep = await axios.post('http://localhost:4000/api/temperatura',{
                numControl,
                temperatura: Number(temperatura)
            })

            alert(rep.data.msg)
            setInfo({
                numControl: '',
                temperatura: ''
            })
        } catch (error) {
            console.log(error.response);
        }

    }

    return ( 
        <div className='my-5 container'>
            
            <h2 className='title mx-5'>Registro temperatura alumnos</h2>
            
            <form className='box'>
                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                        <input
                            value={numControl}
                            onChange={onChange}
                        name='numControl' className="input" type="text" placeholder="Numero de control"/>
                        <span className="icon is-small is-left">
                        {icon(faIdCard)}
                        </span>

                    </p>
                    </div>
                    <div className="field">
                    <p className="control has-icons-left">
                        <input
                            value={temperatura}
                            onChange={onChange}
                        name='temperatura' className="input" type="number" placeholder="Ej:36.5"/>
                        <span className="icon is-small is-left">
                        {icon(faTemperature0)}
                        </span>
                    </p>
                    </div>
                    <div className="field is-flex is-justify-content-end">
                    <p className="control">
                        <input type='submit'
                            onClick={handleSubmit}
                        className="button is-link" 
                        value='Registrar'
                        />
                    </p>
                </div>
            </form>

        </div>
     );
}
 
export default FormTemp;