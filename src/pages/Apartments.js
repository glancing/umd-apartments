import ApartmentList from "../components/ApartmentList";
import FilterForm from "../components/FilterForm";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

export default function Apartments() {
  const [apartments, setApartments] = useState([]);
  const [filterData, setFilterData] = useState({
    price: "none",
    roomType: "none",
  });
  const [extraFilter, setExtraFilter] = useState({
    showFavorites: false,
  });

  useEffect(() => {
    axios.get("https://umd-apartments-api.vercel.app/apartments", {
      params: {
        price: 'none',
        roomType: 'none',
      }
    }).then((res) => {
      setApartments(res.data);
    });
  }, []);

  const onSubmitFilters = (e) => {
    axios.get("https://umd-apartments-api.vercel.app/apartments", {
      params: {
        price: filterData.price,
        roomType: filterData.roomType,
      }
    }).then((res) => {
      if (extraFilter.showFavorites) {
        const filteredApartments = res.data.filter(apartment => {
          return favoritedApartments.includes(apartment._id);
        });
        setApartments(filteredApartments);
      } else {
        setApartments(res.data);
      }
    });
  }

  const submitShowFavorites = (e) => {
    const showOnlyFavorites = e.target.checked;
    if (showOnlyFavorites) {
      const filteredApartments = apartments.filter(apartment => {
        return favoritedApartments.includes(apartment._id);
      });
      setApartments(filteredApartments);
    } else {
      axios.get("https://umd-apartments-api.vercel.app/apartments", {
        params: {
          price: filterData.price,
          roomType: filterData.roomType,
        }
      }).then((res) => {
        setApartments(res.data);
      });
    }
  }

  const favoritedApartments = useSelector((state) => state.favorites);

  return (
    <div className="apartments">
      <FilterForm 
        filterData={filterData} 
        setFilterData={setFilterData} 
        onSubmitFilters={onSubmitFilters}
        extraFilter={extraFilter}
        setExtraFilter={setExtraFilter}
        submitShowFavorites={submitShowFavorites}
      />
      <ApartmentList filteredApartments={apartments} />
    </div>
  );
}