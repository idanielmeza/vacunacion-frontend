import React,{createContext,useState} from 'react';

export const PaginaContext = createContext();

const PaginaProvider = (props) => {

    const [pagina,setPagina] = useState(0)

    return (<PaginaContext.Provider
            value={{    
                pagina,
                setPagina
            }}
        >
            {props.children}
        </PaginaContext.Provider>)

     ;
}
 
export default PaginaProvider;