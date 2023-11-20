import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { FadeLoader } from "react-spinners";

import ApartmentList from "../components/ApartmentList";
import FilterForm from "../components/FilterForm";

import { setApartmentsByFilter } from "../reducers/apartmentsSlice";

export default function Apartments() {
  const dispatch = useDispatch();

  const filterData = useSelector((state) => state.filterSlice);
  const favoritedApartments = useSelector((state) => state.favorites);
  const cachedApartments = useSelector((state) => state.apartments);

  const { price, roomType, rating, showFavorites } = filterData;
  const cacheKey = `${price}-${roomType}-${rating}`;

  let apartments = cachedApartments[cacheKey] ? cachedApartments[cacheKey] : [];
  if (showFavorites) {
    apartments = apartments.filter((apartment) => favoritedApartments.includes(apartment._id));
  }


  if (!cachedApartments[cacheKey]) {
    console.log("getting apartments")
    axios.get("https://umd-apartments-api.vercel.app/apartments", {
      params: {
        price: filterData.price,
        roomType: filterData.roomType,
        rating: filterData.rating
      }
    }).then((res) => {
      dispatch(setApartmentsByFilter({ ...filterData, apartments: res.data }));
    });
  }

  return (
    <div className="apartments">
      <FilterForm />
      {apartments.length === 0 && !showFavorites &&
        <div className="loading">
          <FadeLoader />
        </div>
      }
      <ApartmentList filteredApartments={apartments} />
    </div>
  );
}