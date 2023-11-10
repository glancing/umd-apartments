import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Apartments from './pages/Apartments';
import ApartmentDetails from './pages/ApartmentDetails';
import Login from './pages/Login';
import About from './pages/About';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import Verify from './pages/Verify';

import Cookies from 'js-cookie'; 

function App() {
  const [loggedin, setLoggedin] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    console.log(token);
    if (token) {
      setLoggedin(true);
    } else {
      setLoggedin(false);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <div className="home-container">
          <Link to="/" className="logo-link">
            <h1 className="logo">UMD Apartments</h1>
          </Link>
          <div className="nav-links">
            <Link to="/about" className="nav-link">About</Link>
            {loggedin && <Link to="/account" className="nav-link">Account</Link>}
            {!loggedin && <Link to="/login" className="nav-link">Login</Link>}
            {!loggedin && <Link to="/signup" className="nav-link">Sign Up</Link>}
          </div>
        </div>
        <Routes>
          <Route path="/apartment/:id" element={<ApartmentDetails/>} />
          <Route exact path="/" element={<Apartments/>} />
          <Route exact path="/about" element={<About/>} />
          {loggedin && <Route exact path="/account" element={<Profile/>} />}
          {!loggedin && <Route exact path="/login" element={<Login/>} />}
          {!loggedin && <Route exact path="/signup" element={<Signup/>} />}
          {loggedin && <Route exact path="/verify" element={<Verify/>} />}
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
