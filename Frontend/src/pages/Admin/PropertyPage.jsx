import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAdminStore } from '../../store/useAdminStore';
import { Loader } from 'lucide-react';

const DeleteConfirmationModal = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded shadow-lg w-96 text-center">
      <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
      <p className="mb-6">Are you sure you want to delete this property?</p>
      <div className="flex justify-center gap-4">
        <button onClick={onCancel} className="btn btn-secondary">
          Cancel
        </button>
        <button onClick={onConfirm} className="btn btn-error">
          Delete
        </button>
      </div>
    </div>
  </div>
);

const PropertyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPropertyById, isLoading, deleteProperty } = useAdminStore();
  const [property, setProperty] = useState(null);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getPropertyById(id);
        if (data) {
          setProperty(data);
        } else {
          setError('Property not found');
        }
      } catch (err) {
        setError(err.message || 'Error fetching property details');
      }
    };

    if (id) {
      fetchProperty();
    }

    
  }, [id, getPropertyById]);

  

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader className="w-10 h-10 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        <p className="text-lg">{error}</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="p-4 text-center">
        <p className="text-lg">Property not found</p>
      </div>
    );
  }

  const handleEdit = () => {
    navigate(`/dashboard/listings/${id}/edit`);
  };

  const handleDelete = () => {
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    await deleteProperty(id);
    navigate('/dashboard/listings');
  };
  

  const cancelDelete = () => {
    setDeleteModalOpen(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Property Details</h2>
      <hr className="border mb-6" />
      <div className="space-y-6">
        <div className="flex flex-col justify-center items-center gap-4">
          <img
            src={property.propertyImage}
            alt={property.title}
            className="w-full max-w-md h-auto rounded-md shadow-md"
          />
          <p className="text-lg"><strong>Property ID:</strong> {property._id}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p className="text-lg"><strong>Title:</strong> {property.title}</p>
          <p className="text-lg"><strong>Institute:</strong> {property.institute}</p>
          <p className="text-lg"><strong>Status:</strong> {property.status}</p>
          <p className="text-lg"><strong>Start Date:</strong> {property.startDate}</p>
          <p className="text-lg"><strong>End Date:</strong> {property.endDate}</p>
          <p className="text-lg"><strong>Category:</strong> {property.category}</p>
        </div>
        <div>
          <p className="text-lg">
            <strong>Address:</strong> {property.address}, {property.city}, {property.pincode}, {property.state}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p className="text-lg"><strong>Property Price: </strong> 
            ₹ {new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(property.propertyPrice)}
          </p>
          <p className="text-lg"><strong>Reserved Price: </strong>
          ₹ {new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(property.reservedPrice)}
          </p>
          <p className="text-lg"><strong>EMD Amount: </strong>
          ₹ {new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(property.emdAmount)}
          </p>
        </div>
        <div>
          <p className="text-lg"><strong>Description:</strong> {property.auctionBrief}</p>
        </div>
        <div className="flex justify-center gap-4">
          <button onClick={handleEdit} className="btn btn-warning">
            Edit
          </button>
          <button onClick={handleDelete} className="btn btn-error">
            Delete
          </button>
        </div>
      </div>
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default PropertyPage;
