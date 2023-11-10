import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Student from './Students'


function App() {
  return (

    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Student />}/>
        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App