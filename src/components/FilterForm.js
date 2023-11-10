import { useSelector, useDispatch } from 'react-redux';
import { clearFavorites } from '../reducers/favoritesSlice';

const FilterForm = ({ extraFilter, setExtraFilter, submitShowFavorites, filterData, setFilterData, onSubmitFilters }) => {
  const dispatch = useDispatch();

  const favoritedApartments = useSelector((state) => state.favorites);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilterData({ ...filterData, [name]: value });
  };

  const clearFilters = (e) => {
    e.preventDefault();
    setFilterData({
      price: 'none',
      roomType: 'none',
    });
  };

  const handleShowFavorites = (e) => {
    submitShowFavorites(e);
    setExtraFilter({ ...extraFilter, showFavorites: e.target.checked });
  }

  const onRemoveAllFavorites = (e) => {
    e.preventDefault();
    dispatch(clearFavorites());
    submitShowFavorites({ target: { checked: false } })
    setExtraFilter({ ...extraFilter, showFavorites: false });
  }

  return (
    <div className="filter-form">
      <h2>Filter Apartments</h2>
      <div className='filter-container'>
        <form className="filter-form-inner">
          <div className="form-group">
            <label htmlFor="price">Sort by Price:
              <select
                id="price"
                name="price"
                value={filterData.price}
                onChange={handleInputChange}
              >
                <option value="none">None</option>
                <option value="asc">Lowest</option>
                <option value="desc">Highest</option>
              </select>
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="roomType">Room Type:
              <select
                id="roomType"
                name="roomType"
                value={filterData.roomType}
                onChange={handleInputChange}
              >
                <option value="none">None</option>
                <option value="studio">Studio</option>
                <option value="1bed-1bath">1 Bed / 1 Bath</option>
                <option value="2bed-1bath">2 Bed / 1 Bath</option>
                <option value="2bed-2bath">2 Bed / 2 Bath</option>
                <option value="3bed-2bath">3 Bed / 2 Bath</option>
                <option value="3bed-3bath">3 Bed / 3 Bath</option>
                <option value="4bed-2bath">4 Bed / 2 Bath</option>
                <option value="4bed-4bath">4 Bed / 4 Bath</option>
              </select>
            </label>
          </div>
        </form>
        <div className='filter-form-buttons'>
          <button onClick={onSubmitFilters}>Apply Filters</button>
          <button onClick={clearFilters}>Clear Filters</button>
          <button onClick={onRemoveAllFavorites}>Remove All Favorites</button>
          <label htmlFor="favorited">Show Favorites ({favoritedApartments.length})
            <input
              id="favorited"
              type="checkbox"
              name="favorited"
              checked={extraFilter.showFavorites}
              onChange={handleShowFavorites}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterForm;
