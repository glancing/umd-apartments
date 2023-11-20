import { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Profile() {
  const [email, setEmail] = useState('');
  const [watchlist, setWatchlist] = useState([]);
  const [reviews, setReviews] = useState([]);
  
  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      toast.error('You must be logged in to view profile');
    } else {
      axios.get('https://umd-apartments-api.vercel.app/profile', {
        headers: {
          Authorization: token
        }
      })
        .then((res) => {
          console.log(res.data);
          setEmail(res.data.email);
          setWatchlist(res.data.watchlist);
          setReviews(res.data.reviews);
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
      axios.delete(`https://umd-apartments-api.vercel.app/watchlist/${id}`, {
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

  const deleteReview = (id) => {
    const token = Cookies.get('token');
    if (!token) {
      toast.error('You must be logged in to delete a review');
    } else {
      axios.delete(`https://umd-apartments-api.vercel.app/review/${id}`, {
        headers: {
          Authorization: token
        }
      })
        .then((res) => {
          console.log(res.data);
          toast.success('Review deleted');
          let newReviews = reviews.filter((review) => review._id !== id);
          setReviews(newReviews);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.error);
        });
    }
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
      <div className="watchlist">
        <h3>Reviews</h3>
        <ul>
          {reviews.map((review) => (
            <li key={review._id} className="apartment-item">
              <div className="watchlist-item">
                <p>{review.name}</p>
                <p>{review.bedbath}</p>
                <p>Review: {review.review}</p>
                <div className="review-stars">
                  {Array.from({ length: review.rating }, (_, index) => (
                    <span key={index} className="star">&#9733;</span>
                  ))}
                  {Array.from({ length: 5 - review.rating }, (_, index) => (
                    <span key={index} className="star">&#9734;</span>
                  ))}
                </div>
                <button className="remove-button" 
                  onClick={() => deleteReview(review._id)}>Remove Review</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}