import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Search = ({clase}) => {

    const [id,setId] = useState(null);

    const navigate = useNavigate();

    const handleChange = e =>{
        setId(e.target.value);
    }

    const buscar = ()=>{

        if(!id){
            alert('Se necesita un numero de control');
            return;
        }

        navigate(`/alumnos/${id}`)

    }

    return ( 
        <div className='field is-flex is-justify-content-end mx-2'>
            <p className='control'>
                <input
                    onChange={handleChange}
                className='input' placeholder='Busca numero de control' type='search'/>
            </p>
            <p className='control'>
                <button
                    onClick={buscar}
                type='button' className={`button is-${clase}`}>Buscar</button>
            </p>
        </div>
     );
}
 
export default Search;