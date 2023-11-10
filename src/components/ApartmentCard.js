import { ReactComponent as StarIcon } from './star.svg';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../reducers/favoritesSlice';
import { Link } from 'react-router-dom';

const ApartmentCard = ({ data }) => {
  const dispatch = useDispatch();
  /*
  {"_id":{"$oid":"654be2991b334de2e10ea22a"},"name":"S1","bedbath":"Studio / 1ba","rents":["$2049"],"roomtype_to_rent":{"Standard":"$2049"},"sq_feet":"422","floorplan_img":"https://medialibrarycfo.entrata.com/fit-in/300x503/8916/MLv3/4/22/2022/3/26/96823/61d5e2f41874f5.15606363159.jpg","year":"08/23/2024 - 07/31/2025","timestamp":{"$numberDouble":"1699472014936.0"},"apartment":"Terrapin Row","apartment_id":"terrapin-row"}
  */
  const {
    _id,
    name,
    bedbath,
    roomtype_to_rent,
    sq_feet,
    year,
    apartment,
  } = data;

  const favoritedApartments = useSelector((state) => state.favorites);
  const isFavorited = favoritedApartments.includes(_id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(_id));
  };

  let floorplan_img = data.floorplan_img

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