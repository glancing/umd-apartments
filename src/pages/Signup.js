import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast, Toaster } from 'react-hot-toast';

export default function Signup() {
  const [email, setSignupEmail] = useState('');
  const [password, setSignupPassword] = useState('');

  const isValidEmail = (email) => {
    // Regular expression for a simple email validation
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailPattern.test(email);
  }

  const handleSignup = () => {
    if (!(isValidEmail(email))) return toast.error('Invalid email');
    if (password.length < 4) return toast.error('Password must be at least 4 characters');

    axios.post('https://umd-apartments-api.vercel.app/signup', {
      email,
      password
    })
      .then((res) => {
        if (res.data.token) {
          Cookies.set('token', res.data.token, { expires: 7 });
          window.location.href = '/verify';
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
        <h2>Signup</h2>
        <div className="input-container">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setSignupEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setSignupPassword(e.target.value)}
          />
        </div>
        <button onClick={handleSignup}>Signup</button>
      </div>
    </div>
  );
}