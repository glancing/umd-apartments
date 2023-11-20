import { ReactComponent as StarIcon } from './star.svg';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../reducers/favoritesSlice';
import { Link } from 'react-router-dom';

const ApartmentCard = ({ data }) => {
  const dispatch = useDispatch();
  let {
    _id,
    name,
    bedbath,
    roomtype_to_rent,
    sq_feet,
    year,
    apartment,
    rating,
    numberOfReviews
  } = data;

  const favoritedApartments = useSelector((state) => state.favorites);
  const isFavorited = favoritedApartments.includes(_id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(_id));
  };

  let floorplan_img = data.floorplan_img

  if (!rating) rating = 0;
  if (!numberOfReviews) numberOfReviews = 0;

  return (
    <div className="apartment-card">
      <div className="card-content">
        <div className='card-top'>
          <div className={`favorite-icon ${isFavorited ? 'favorited' : ''}`} onClick={handleToggleFavorite}>
            <StarIcon />
          </div>
          <h2>{name}</h2>
        </div>
        { floorplan_img && <img src={floorplan_img} alt="Floorplan" /> }
        <div className="review-details">
          <div className="review-stars">
            {Array.from({ length: rating }, (_, index) => (
              <span key={index} className="star">&#9733;</span>
            ))}
            {Array.from({ length: 5 - rating }, (_, index) => (
              <span key={index} className="star">&#9734;</span>
            ))}
          </div>
          <p>{numberOfReviews} Reviews</p>
        </div>
        <div className="apartment-details">
          <p>Bed/Bath: {bedbath}</p>
          <p>Square Feet: {sq_feet} sq ft</p>
          <p>Lease Year: {year}</p>
          <p>Apartment Name: {apartment}</p>
          <div className="room-type-rent">
            {Object.entries(roomtype_to_rent).map(([roomType, rent], index) => (
              <p key={index}>
                <strong>{roomType}:</strong> {rent}
              </p>
            ))}
          </div>
        </div>
        <div className="center-button">
          <Link to={`/apartment/${_id}`}>
            <button className="details-button">View Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ApartmentCard;