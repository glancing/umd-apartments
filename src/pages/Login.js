import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast, Toaster } from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    axios.post('/login', {
      email,
      password
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.token) {
          Cookies.set('token', res.data.token, { expires: 7 });
          //redirect home
          window.location.href = '/';
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          toast.error(err.response.data.error);
        }
      });
  };

  return (
    <div className="login-container">
      <div><Toaster/></div>
      <div className="login-box">
        <h2>Login</h2>
        <div className="input-container">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}