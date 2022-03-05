import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

import {useState, useEffect} from 'react';

const Charts = () => {

    const [tipo,setTipo] = useState('enfermos');
    const [enfermos,setEnfermos] = useState([]);
    const [vacunados, setVacunados] = useState([]);

    const onChange = e =>{
      setTipo(e.target.value)
    }

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );

    const data = {
        labels: enfermos.map(dato =>(
          dato._id ? dato._id : 'Sin vacunar'
        )),
        datasets:[
            {
                label: 'Enfermos ITSPR',
                data:enfermos.map(dato=> dato.count),
                backgroundColor:['#FF6384','#36A2EB','#FFCE56','#FF6384','#36A2EB'],
                hoverBackgroundColor:['#FF6385','#36A2EC','#FFCE57','#FF6385','#36A2EC'],
                boderWidth:1,
                borderColor:'#777',
            }
        ]
    }

    const data2 = {
      labels: vacunados.map(dato => dato._id),
      datasets:[
          {
              label: 'Vacunacion ITSPR',
              data:vacunados.map(dato=> dato.count),
              backgroundColor:['#FF6384','#36A2EB','#FFCE56','#FF6384','#36A2EB'],
              hoverBackgroundColor:['#FF6385','#36A2EC','#FFCE57','#FF6385','#36A2EC'],
              boderWidth:1,
              borderColor:'#777',
          }
      ]
    }

    const options = {
        responsive: true,
    }

    useEffect(async()=>{
      
      const [info, info2] = await Promise.all([
        await (await fetch('http://localhost:4000/api/alumno/grafica')).json(),
        await (await fetch('http://localhost:4000/api/alumno/graficaEnfermo')).json(),
      ])

      info.forEach(reg=>{
        if(!reg._id){
          reg._id = 'Sin Informacion'
        }
      })

      setVacunados(info);
      setEnfermos(info2);

    },[])

    return ( 
        <div className='m-5 box'>
          <div className='select'>
            <select
              value={tipo}
              onChange={onChange}
            >
              <option value='enfermos'>Enfermos</option>
              <option value='vacunados'>Vacunados</option>
            </select>
          </div>

            {tipo == 'enfermos' ? 
              <Bar data={data} options={options}/>
            :
            <Bar data={data2} options={options}/>
            }           
        </div>
        

     );
}
 
export default Charts;