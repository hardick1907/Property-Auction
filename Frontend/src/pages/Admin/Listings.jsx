import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TableSkeleton from "../../components/Skeletons/TableSkeleton";
import { useAdminStore } from "../../store/useAdminStore";
import { format } from "date-fns";

const Listings = () => {
  const { isLoading, properties, getAllProperties } = useAdminStore();
  const navigate = useNavigate();

  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    getAllProperties();
  }, [getAllProperties]);

  useEffect(() => {
    let filtered = properties;

    if (categoryFilter) {
      filtered = filtered.filter(
        (property) => property.category === categoryFilter
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(
        (property) => property.status === statusFilter
      );
    }

    setFilteredProperties(filtered);
  }, [categoryFilter, statusFilter, properties]);

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const currentPageProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewDetails = (propertyId) => {
    navigate(`/dashboard/listings/${propertyId}`);
  };

  return (
    <div className="flex flex-col items-center p-4 lg:p-16">
      {/* Filters */}
      <div className="flex flex-col lg:flex-row w-full lg:justify-between items-center mb-6 gap-4">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="select select-bordered w-full lg:w-1/3"
        >
          <option value="">All Categories</option>
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
          <option value="Land">Land</option>
          <option value="Specialty">Specialty</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="select select-bordered w-full lg:w-1/3"
        >
          <option value="">All Statuses</option>
          <option value="Vacant">Vacant</option>
          <option value="Booked">Booked</option>
        </select>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 text-sm lg:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2">S.No</th>
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Type</th>
              <th className="border border-gray-300 p-2">Area (sq.mt)</th>
              <th className="border border-gray-300 p-2">Property Price</th>
              <th className="border border-gray-300 p-2">Reserved Price</th>
              <th className="border border-gray-300 p-2">EMD Amount</th>
              <th className="border border-gray-300 p-2">Start Date</th>
              <th className="border border-gray-300 p-2">End Date</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="11" className="text-center p-4">
                  <TableSkeleton />
                </td>
              </tr>
            ) : currentPageProperties.length > 0 ? (
              currentPageProperties.map((property, index) => (
                <tr key={property._id} className="text-center hover:bg-gray-50">
                  <td className="border border-gray-300 p-2">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="border border-gray-300 p-2">{property._id}</td>
                  <td className="border border-gray-300 p-2">
                    {property.category}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {property.area}
                  </td>
                  <td className="border border-gray-300 p-2">
                    ₹{" "}
                    {new Intl.NumberFormat("en-IN", {
                      maximumFractionDigits: 2,
                    }).format(property.propertyPrice)}
                  </td>
                  <td className="border border-gray-300 p-2">
                    ₹{" "}
                    {new Intl.NumberFormat("en-IN", {
                      maximumFractionDigits: 2,
                    }).format(property.reservedPrice)}
                  </td>
                  <td className="border border-gray-300 p-2">
                    ₹{" "}
                    {new Intl.NumberFormat("en-IN", {
                      maximumFractionDigits: 2,
                    }).format(property.emdAmount)}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {format(new Date(property.startDate), "MMM d, yyyy")}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {format(new Date(property.endDate), "MMM d, yyyy")}
                  </td>
                  <td
                    className={`border border-gray-300 p-2 ${
                      property.status === "Vacant"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {property.status}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => handleViewDetails(property._id)}
                      className="btn btn-xs btn-primary"
                    >
                      Edit/Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="text-center p-4">
                  No properties found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between w-full mt-6">
        <button
          className="btn btn-sm"
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-2">
          Page {currentPage} of {totalPages}
        </span>
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

export default Listings;
