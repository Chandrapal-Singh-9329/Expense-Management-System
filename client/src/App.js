import {Routes , Route} from 'react-router-dom';
import HomePage from './Pages/Home';
import Register from './Pages/Register'
import Login from './Pages/Login'

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path='/login' element={<Login />} />
    </Routes>
    
    </>
  );
}

export default App;
