import {Route,Routes} from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import CreateTrip from './pages/CreateTrip.jsx';

export const App = () => {
  return (
    <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/trips/create' element={<CreateTrip />} />
    </Routes>
  )
}
