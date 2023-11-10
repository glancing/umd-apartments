import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../reducers/favoritesSlice';
import Cookies from 'js-cookie';
import PriceChart from '../components/PriceChart';
import { toast, Toaster } from 'react-hot-toast';

export default function ApartmentDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
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
    floorplan_link: ''
  });
  
  const favoritedApartments = useSelector((state) => state.favorites);
  const isFavorited = favoritedApartments.includes(id);

  useEffect(() => {
    // Fetch apartment details
    axios.get(`/apartments/${id}`).then((res) => {
      console.log(res.data);
      setApartment(res.data);
    });
  }, [id]);

  let floorplan_img = apartment.floorplan_img;

  const viewApartment = () => {
    window.open(apartment.floorplan_link, '_blank');
  }

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(apartment._id));

  };

  const handleWatchList = () => {
    const token = Cookies.get('token');
    if (!token) {
      toast.error('You must be logged in to add to watchlist');
    } else {
      axios.post(`/watchlist/${id}`, null, {
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

  return (
    <div className="apartment-details-page">
      <div><Toaster/></div>
      <div className="floorplan-image">
        { floorplan_img && <img src={floorplan_img} alt="Floorplan" /> }
      </div>
      <div className="info">
        <h2>{apartment.name} - {apartment.apartment}</h2>
        <PriceChart data={apartment.priceData} />
        <p>Bed/Bath: {apartment.bedbath}</p>
        <p>Square Feet: {apartment.sq_feet} sq ft</p>
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
  );
}