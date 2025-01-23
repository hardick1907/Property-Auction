import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TableSkeleton from '../../components/Skeletons/TableSkeleton';
import { useAdminStore } from '../../store/useAdminStore';
import { format } from "date-fns";

const AuctionList = () => {
  const { isLoading, properties, getAllProperties } = useAdminStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [statusFilter, setStatusFilter] = useState('');
  const [liveStatusFilter, setLiveStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    getAllProperties();
  }, [getAllProperties]);

  // In the filtering logic
  useEffect(() => {
    let filtered = properties;
  
    // Get search parameters from URL
    const location = searchParams.get('location');
    const propertyType = searchParams.get('propertyType');
    const priceRange = searchParams.get('priceRange');
  
    // Apply filters only if they exist
    if (location) {
      filtered = filtered.filter(property =>
        property.city?.toLowerCase().includes(location.toLowerCase())
      );
    }
    if (propertyType) {
      filtered = filtered.filter(property =>
        property.category === propertyType
      );
    }
    if (priceRange) {
      const [min, max] = getPriceRangeValues(priceRange);
      filtered = filtered.filter(property =>
        property.propertyPrice >= min && property.propertyPrice <= max
      );
    }
  
    // Apply other filters
    if (categoryFilter) {
      filtered = filtered.filter(property => property.category === categoryFilter);
    }
    if (statusFilter) {
      filtered = filtered.filter(property => property.status === statusFilter);
    }
    if (liveStatusFilter) {
      const currentDate = new Date();
      if (liveStatusFilter === 'Live') {
        filtered = filtered.filter(property =>
          new Date(property.startDate) <= currentDate &&
          new Date(property.endDate) >= currentDate
        );
      } else if (liveStatusFilter === 'Upcoming') {
        filtered = filtered.filter(property =>
          new Date(property.startDate) > currentDate
        );
      }
    }
  
    setFilteredProperties(filtered);
    setCurrentPage(1);
  }, [properties, categoryFilter, statusFilter, liveStatusFilter, searchParams]);
  


  const getPriceRangeValues = (range) => {
    const ranges = {
      '₹ 10,00,000 - ₹ 20,00,000': [1000000, 2000000],
      '₹ 20,00,000 - ₹ 30,00,000': [2000000, 3000000],
      '₹ 30,00,000 - ₹ 40,00,000': [3000000, 4000000],
      '₹ 40,00,000 - ₹ 50,00,000': [4000000, 5000000],
      '₹ 50,00,000 - ₹ 60,00,000': [5000000, 6000000],
      '₹ 60,00,000 - ₹ 70,00,000': [6000000, 7000000],
      '₹ 70,00,000 - ₹ 80,00,000': [7000000, 8000000],
    };
    return ranges[range] || [0, Infinity];
  };

  const handleViewDetails = (propertyId) => {
    navigate(`/auctions/${propertyId}`);
  };

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const currentPageProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setCategoryFilter('');
    setStatusFilter('');
    setLiveStatusFilter('');
    setFilteredProperties(properties); // Reset to all properties
    setCurrentPage(1); // Reset to the first page
    // Clear the URL search parameters
    const params = new URLSearchParams();
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
  };
  

  return (
    <div className='flex flex-col justify-center items-center p-4 pt-20'>
      <div className="flex flex-col w-1/2 lg:flex-row justify-center items-center p-4">
  <select
    value={categoryFilter}
    onChange={(e) => setCategoryFilter(e.target.value)}
    className="select select-bordered w-full max-w-xs mr-4"
  >
    <option value="">All Category</option>
    <option value="Residential">Residential</option>
    <option value="Commercial">Commercial</option>
    <option value="Land">Land</option>
    <option value="Specialty">Specialty</option>
  </select>
  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="select select-bordered w-full max-w-xs mr-4"
  >
    <option value="">All Statuses</option>
    <option value="Vacant">Vacant</option>
    <option value="Booked">Booked</option>
  </select>
  <select
    value={liveStatusFilter}
    onChange={(e) => setLiveStatusFilter(e.target.value)}
    className="select select-bordered w-full max-w-xs mr-4"
  >
    <option value="">All Auctions</option>
    <option value="Live">Live</option>
    <option value="Upcoming">Upcoming</option>
  </select>

  {/* Reset Filters Button */}
  <button
    onClick={resetFilters}
    className="btn btn-secondary max-w-xs mt-4 lg:mt-0"
  >
    Reset Filters
  </button>
</div>


      <div className="overflow-x-auto w-full">
        <table className="table w-full max-w-full">
          <thead>
            <tr className="text-center border-4 border-gray-400">
              <th className="text-lg">S.No</th>
              <th className="text-lg">ID</th>
              <th className="text-lg">Type</th>
              <th className="text-lg">Area (sq.mt)</th>
              <th className="text-lg">Property Price</th>
              <th className="text-lg">Reserved Price</th>
              <th className="text-lg">EMD Amount</th>
              <th className="text-lg">Start Date</th>
              <th className="text-lg">End Date</th>
              <th className="text-lg">Status</th>
              <th className="text-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="11" className="text-center">
                  <TableSkeleton />
                </td>
              </tr>
            ) : (
              currentPageProperties.map((property, index) => (
                <tr key={property._id} className="text-center">
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{property._id}</td>
                  <td>{property.category}</td>
                  <td>{property.area}</td>
                  <td>₹ {new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(property.propertyPrice)}</td>
                  <td>₹ {new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(property.reservedPrice)}</td>
                  <td>₹ {new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(property.propertyPrice)}</td>
                  <td className='truncate'>{format(new Date(property.startDate), 'MMM d, yyyy')}</td>
                  <td className='truncate'>{format(new Date(property.endDate), 'MMM d, yyyy')}</td>
                  <td
                    className={property.status === 'Vacant' ? 'text-accent' : 'text-error'}
                  >
                    {property.status}
                  </td>
                  <td>
                    <button
                      onClick={() => handleViewDetails(property._id)}
                      className="btn btn-xs btn-primary"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination mt-4">
        <button
          className="btn btn-sm"
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-2">{currentPage} of {totalPages}</span>
        <button
          className="btn btn-sm"
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AuctionList;