import ApartmentCard from './ApartmentCard';

const ApartmentList = ({ filteredApartments }) => {
  return (
    <div className="apartment-list">
      {filteredApartments.map((apartment, index) => (
        <ApartmentCard key={index} data={apartment} />
      ))}
    </div>
  );
};

export default ApartmentList;
