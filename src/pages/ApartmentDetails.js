import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import NewPriceChart from '../components/NewPriceChart';
import { toast, Toaster } from 'react-hot-toast';
import ReviewModal from '../components/ReviewModal';

import { toggleFavorite } from '../reducers/favoritesSlice';

export default function ApartmentDetails() {
  window.scrollTo(0, 0);

  const dispatch = useDispatch();
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apartment, setApartment] = useState({
    name: '',
    bedbath: '',
    rents: [],
    roomtype_to_rent: {},
    sq_feet: '',
    year: '',
    apartment: '',
    apartment_id: '',
    priceData: [],
    floorplan_img: '',
    floorplan_link: '',
    reviews: [],
    rating: 0,
    numberOfReviews: 0,
  });
  
  const favoritedApartments = useSelector((state) => state.favorites);
  const isFavorited = favoritedApartments.includes(id);

  useEffect(() => {
    // Fetch apartment details
    axios.get(`https://umd-apartments-api.vercel.app/apartments/${id}`).then((res) => {
      console.log('RESSS', res.data)
      setApartment(res.data);
    });
  }, [id]);

  let floorplan_img = apartment.floorplan_img;

  const viewApartment = () => {
    window.open(apartment.floorplan_link, '_blank');
  }

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(apartment._id));
  }

  const handleWatchList = () => {
    const token = Cookies.get('token');
    if (!token) {
      toast.error('You must be logged in to add to watchlist');
    } else {
      axios.post(`https://umd-apartments-api.vercel.app/watchlist/${id}`, null, {
        headers: {
          Authorization: token
        }
      })
        .then((res) => {
          console.log(res.data);
          toast.success('Apartment added to watchlist', {
            duration: 1500
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.error, {
            duration: 1500
          });
        });
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const submitReview = (rating, reviewMessage) => {
    // Add your logic to submit the review, e.g., sending it to a server
    // For now, you can log the values to the console
    const token = Cookies.get('token');
    if (!token) return toast.error('You must be logged in to submit a review');
    if (rating < 1 || reviewMessage.length < 1) return toast.error('Please fill out all fields');

    closeModal();

    axios.post(`https://umd-apartments-api.vercel.app/review`, {
        apartmentDocId: id,
        rating,
        review: reviewMessage
      }, {
        headers: {
          Authorization: token
        }
      })
      .then((res) => {
        toast.success('Review submitted', {
          duration: 1500
        });
        setApartment({
          ...apartment,
          rating: Math.floor((apartment.rating * apartment.numberOfReviews + rating) / (apartment.numberOfReviews + 1)),
          numberOfReviews: apartment.numberOfReviews + 1,
          reviews: [
            ...apartment.reviews,
            {
              rating,
              review: reviewMessage,
              timestamp: Date.now()
            }
          ]
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error, {
          duration: 1500
        });
      });
  }

  console.log(apartment);

  return (
    <div className='apartment-details-wrapper'>
      <div className="apartment-details-page">
        <div><Toaster/></div>
        <div className="floorplan-image">
          { floorplan_img && <img src={floorplan_img} alt="Floorplan" /> }
        </div>
        <div className="info">
          <h2>{apartment.name} - {apartment.apartment}</h2>
          <NewPriceChart data={apartment.priceData} roomtype_to_rent={apartment.roomtype_to_rent}/>
          <p>Lease Year {apartment.year}</p>
          <p>Bed/Bath: {apartment.bedbath}</p>
          <p>Square Feet: {apartment.sq_feet} sq ft</p>
          <div className="review-details">
            <div className="review-stars">
              {Array.from({ length: apartment.rating }, (_, index) => (
                <span key={index} className="star">&#9733;</span>
              ))}
              {Array.from({ length: 5 - apartment.rating }, (_, index) => (
                <span key={index} className="star">&#9734;</span>
              ))}
            </div>
            <p>{apartment.numberOfReviews} Reviews</p>
          </div>
          <div className="room-type-rent">
              {Object.entries(apartment.roomtype_to_rent).map(([roomType, rent], index) => (
                <p key={index}>
                  <strong>{roomType}:</strong> {rent}
                </p>
              ))}
          </div>
          <div className="details-btn-container">
            <button className="details-btn favorites" onClick={handleToggleFavorite}>
              {isFavorited ? 'Remove from Favorites': 'Add to Favorites'}
            </button>
            <button className="details-btn watchlist" onClick={handleWatchList}>Add to WatchList</button>
            <button className="details-btn website" onClick={viewApartment}>View on Apartment Website</button>
          </div>
        </div>
      </div>
      <div className="review-section">
          <h2>Reviews</h2>
          { apartment.reviews.length === 0 && <p>No reviews yet!</p>}
          <button className="write-review-button" onClick={openModal}>Write a Review</button>
          <div className="reviews">
            {apartment.reviews.map((review) => (
              <div key={review._id} className="review">
                <div className="review-header">
                  <div className="review-stars">
                    {Array.from({ length: review.rating }, (_, index) => (
                      <span key={index} className="star">&#9733;</span>
                    ))}
                  </div>
                  <span className="review-date">{new Date(review.timestamp).toLocaleDateString()}</span>
                </div>
                <p className="review-message">{review.review}</p>
              </div>
            ))}
        </div>
      </div>
      {isModalOpen && (
        <ReviewModal 
          submitReview={submitReview}
          openModal={openModal}
          isModalOpen={isModalOpen}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}