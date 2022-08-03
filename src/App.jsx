import './App.css';
import { Navigate, Route , Routes, useNavigate } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import About from './Components/About/About';
import Movies from './Components/Movies/Movies';
import Network from './Components/Network/Network';
import Register from './Components/Register/Register';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import MovieDetails from './Components/MovieDetails/MovieDetails';
import { CounterContextProvider } from './CreateCounterContext';

function App() {
  let naavigate = useNavigate();
  
  const [userData, setUserData] = useState(null);

 useEffect(() => {
  getUserData()
 }, [])
 

  function ProtectedRoute ({children}) {
    if (!localStorage.getItem('Token')) {
      return <Navigate to ='/login'/>
    }
    else{
      return children
    }
  }
  

function getUserData() {
  
  let userToken = jwtDecode(localStorage.getItem('Token'));
  setUserData(userToken); 
}

function logOut() {
  localStorage.removeItem('Token');
  setUserData(null);
  naavigate('/login');

}




return (<>
  <Navbar userData={userData} logOut={logOut} />
  <div className="container">
<CounterContextProvider>

  <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='home' element={<ProtectedRoute> <Home/> </ProtectedRoute> } />
    <Route path='login' element={<Login getUserData={getUserData}/>} />
    <Route path='about' element={<ProtectedRoute><About/></ProtectedRoute>} />
    <Route path='movies' element={<Movies/>} />
    <Route path='MovieDetails' element={<MovieDetails/>}>
      <Route path=':id' element={<MovieDetails/>} />

    </Route>
    <Route path='network' element={<Network/>} />
    <Route path='register' element={<Register/>} />
    <Route path='*' element={<h2>404</h2>} />
  
  </Routes>
</CounterContextProvider>

  </div>

       
  </>
   
  );
}

export default App;
