import {Routes , Route, Navigate} from 'react-router-dom';
import HomePage from './Pages/Home';
import Register from './Pages/Register'
import Login from './Pages/Login'

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<ProtectedRoute>
        <HomePage />
        </ProtectedRoute>} />
      <Route path="/register" element={<Register />} />
      <Route path='/login' element={<Login />} />
    </Routes>
    
    </>
  );
}

// protect from unauthorised access
export function ProtectedRoute(props){
  if(localStorage.getItem('user'))
 {
  return props.children;
 }
 else{
  return <Navigate to='/login' />
 }
}
 

export default App;
