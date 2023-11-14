import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Student from './Students'
import CreateStudent from './CreateStudent';


function App() {
  return (
    // Dentro del <BrowserRouter>, se definen las rutas de la aplicación usando el componente <Routes>, que a su vez contiene múltiples <Route> elementos. Cada <Route> define una ruta específica y el componente que se debe renderizar cuando se visita esa ruta en particular.
    // para utilizar el componente Link de react-router-dom de manera efectiva, es esencial configurar las rutas dentro de la jerarquía de componentes que utilizan un enrutador, como <BrowserRouter>. 


    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Student />}/>
          <Route path="/create" element={<CreateStudent/>}/>
        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App
