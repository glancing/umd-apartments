import { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Profile() {
  const [email, setEmail] = useState('');
  const [watchlist, setWatchlist] = useState([]);
  
  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      toast.error('You must be logged in to view profile');
    } else {
      axios.get('/profile', {
        headers: {
          Authorization: token
        }
      })
        .then((res) => {
          console.log(res.data);
          setEmail(res.data.email);
          setWatchlist(res.data.watchlist);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.error)
          if (err.response.data.error.includes('does not exist')) {
            Cookies.remove('token');
            window.location.href = '/';
          }
        });
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    window.location.href = '/';
  }

  const handleRemoveFromWatchlist = (id) => {
    const token = Cookies.get('token');
    if (!token) {
      toast.error('You must be logged in to remove from watchlist');
    } else {
      axios.delete(`/watchlist/${id}`, {
        headers: {
          Authorization: token
        }
      })
        .then((res) => {
          console.log(res.data);
          setWatchlist(res.data.watchlist);
          toast.success('Apartment removed from watchlist');
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.error);
        });
    }
  }

  const handleDetailsBtn = (id) => {
    window.location.href = `/apartment/${id}`;
  }

  return (
    <div className="profile-page">    
      <div><Toaster/></div>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <div className="user-profile">
        <h2>User Profile</h2>
        <p>Email: {email}</p>
      </div>
      <div className="watchlist">
        <h3>Watchlist</h3>
        <ul>
          {watchlist.map((apartment) => (
            <li key={apartment._id} className="apartment-item">
              <div className="watchlist-item">
                <h2>{apartment.apartment}</h2>
                <p>{apartment.name}</p>
                <p>{apartment.bedbath}</p>
                <button className="watchlist-details-btn" 
                  onClick={() => handleDetailsBtn(apartment._id)}>Go to Details</button>
                <button className="remove-button" 
                  onClick={() => handleRemoveFromWatchlist(apartment._id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}