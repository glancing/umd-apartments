import { useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';


export default function Verify() {
  const [verificationCode, setVerificationCode] = useState('');

  const handleVerify = () => {
    axios.post('/verify', { verificationCode }, 
      { headers: { Authorization: Cookies.get('token') } }
    )
      .then((res) => {
        if (res.data.success) {
          toast.success('Email verified successfully');
          window.location.href = '/';
          // You can redirect the user to a dashboard or another page upon successful verification.
          // For example: window.location.href = '/dashboard';
        } else {
          toast.error('Verification code is invalid');
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error);
      });
  };

  return (
    <div className="verify-container">
      <div><Toaster/></div>
      <div className="verify-box">
        <h2>Verify Your Email</h2>
        <h3>Check Spam for Email</h3>
        <div className="input-container">
          <input
            type="text"
            placeholder="Verification Code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
        </div>
        <button onClick={handleVerify}>Verify</button>
      </div>
    </div>
  );
}