import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminStore } from '../../store/useAdminStore';
import { Loader } from 'lucide-react';

const EditConfirmationModal = ({ onConfirm, onCancel }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96 text-center">
        <h3 className="text-xl font-bold mb-4">Confirm Update</h3>
        <p className="mb-6">Are you sure you want to update this property?</p>
        <div className="flex justify-center gap-4">
          <button onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn btn-error">
            Update
          </button>
        </div>
      </div>
    </div>
  );

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, getPropertyById,editProperty } = useAdminStore();
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getPropertyById(id);
        if (data) {
          setFormData({
            ...data,
            startDate: data.startDate?.split('T')[0],
            endDate: data.endDate?.split('T')[0],});
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

  const handleInputChange = (e) => {
     const { name, value, type, files } = e.target;
    
        if (type === "file") {
          const file = files[0];
          // Validate file type and size
          if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            const maxSize = 5 * 1024 * 1024; // 5MB
    
            if (!validTypes.includes(file.type)) {
              toast.error("Please upload only JPG, JPEG or PNG images");
              return;
            }
    
            if (file.size > maxSize) {
              toast.error("File size should be less than 5MB");
              return;
            }
    
            setFormData(prev => ({
              ...prev,
              [name]: file
            }));
          }
        } else {
          setFormData(prev => ({
            ...prev,
            [name]: value
          }));
        }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditModalOpen(true);
  }

  const confirmUpdate = async () => {
    const success = await editProperty(id, formData);
    if (success) {
      navigate("/dashboard/listings");
    }
  };

  

  const cancelUpdate = () => {
    setEditModalOpen(false);
  };
  

  if (isLoading || !formData) {
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

  return (
    <>
      <section >
          <h1 className="text-3xl font-bold text-center">Edit Property</h1>
        <hr className="my-5 border border-gray-300" />
        <form onSubmit={handleSubmit}>

          <div className="w-full my-4">
            <span className="mb-2">Status </span>
            <select name="status" value={formData.status} onChange={handleInputChange}
            className="select select-bordered w-full max-w-xs">
              <option value="Vacant">Vacant</option>
              <option value="Booked">Booked</option>
            </select>
          </div>
          <div className="w-full my-4">
            <span className="mb-2">Title </span>
            <input type="text" name="title" className="input input-bordered w-full max-w-xs"
            value={formData.title} onChange={handleInputChange} />
          </div>

          <div className="flex items-center gap-5 my-4">
            <div className="w-1/2">
              <span className="mb-2">Auction Category </span>
              <select name="category" className="select select-bordered w-full max-w-xs"
              value={formData.category} onChange={handleInputChange}>
                <option value="">Select state</option>
                <option value="Residential">Residential Property</option>
                <option value="Commercial">Commercial Property</option>
                <option value="Land">Land</option>
                <option value="Specialty">Specialty Property</option>
              </select>
            </div>
            <div className="w-1/2">
              <span className="mb-2">Institute Name(Bank Name) </span>
              <input type="text" name="institute"  className="input input-bordered w-full max-w-xs"  
              value={formData.institute} onChange={handleInputChange}/>
            </div>
            
          </div>

          <div>
            <span className="flex items-center gap-5 my-4">Address</span>
            <textarea name="address" placeholder="Address" className="textarea textarea-bordered w-full"
            value={formData.address} onChange={handleInputChange}></textarea>
          </div>
          
          <div className="flex items-center gap-5 my-4">
          <div className="w-1/2">
              <span className="mb-2">City </span>
              <input type="text" name="city" className="input input-bordered w-full max-w-xs"
              value={formData.city} onChange={handleInputChange}/>
            </div>
            <div className="w-1/2">
              <span className="mb-2">State </span>
              <select 
                  name="state"
                  className="select select-bordered w-full max-w-xs"
                  value={formData.state}
                  onChange={handleInputChange}
                >
                  <option value="">Select state</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                </select>
            </div>
            <div className="w-1/2">
              <span className="mb-2">Pincode </span>
              <input type="number" name="pincode"  className="input input-bordered w-[80%] max-w-xs" 
              value={formData.pincode} onChange={handleInputChange} />
            </div>

          </div>

          <div  className="flex items-center gap-5 my-4">
          <div className="w-1/2">
              <span className="mb-2">Area (In Sq.mt) </span>
              <input type="number" name="area"  className="input input-bordered w-[80%] max-w-xs" 
              value={formData.area} onChange={handleInputChange} />
            </div>
          </div>

          <div className="flex items-center gap-5 my-4">
            <div className="w-1/2">
              <span className="mb-2">Property Price </span>
              <input type="number" name="propertyPrice"  className="input input-bordered w-[80%] max-w-xs"  
              value={formData.propertyPrice} onChange={handleInputChange}/>
            </div>

            <div className="w-1/2">
              <span className="mb-2">Reserved Price </span>
              <input type="number" name="reservedPrice"  className="input input-bordered w-[80%] max-w-xs"  
              value={formData.reservedPrice} onChange={handleInputChange}/>
            </div>
            <div className="w-1/2">
              <span className="mb-2">EMD Amount </span>
              <input type="number" name="emdAmount" className="input input-bordered w-[80%] max-w-xs"
              value={formData.emdAmount} onChange={handleInputChange}/>
            </div>

            <div>
              <span className="mb-2">Starting Bid Amount </span>
              <input type="number" name="startingBidAmount" className="input input-bordered w-[80%] max-w-xs"
              value={formData.startingBidAmount} onChange={handleInputChange}/>
            </div>

            <div>
              <span className="mb-2">Minimum Bid Amount </span>
              <input type="number" name="minimunBidAmount" className="input input-bordered w-[80%] max-w-xs"
              value={formData.minimunBidAmount} onChange={handleInputChange}/>
            </div>
          </div>

          <div className="flex items-center gap-5 my-4">
            <div className="w-1/2">
              <span className="mb-2">Start Date </span>
              <input type="date" name="startDate" className="input input-bordered w-full max-w-xs"
              value={formData.startDate} onChange={handleInputChange}/>
            </div>
            <div className="w-1/2">
              <span className="mb-2">End Date </span>
              <input type="date" name="endDate" className="input input-bordered w-full max-w-xs"
              value={formData.endDate} onChange={handleInputChange}/>
            </div>
          </div>
          
          <div className="flex items-center gap-5 my-4">
            <span className="mb-2">Auction Brief</span>
            <textarea name="auctionBrief" className="textarea textarea-bordered w-full"
            value={formData.auctionBrief} onChange={handleInputChange}></textarea>
          </div>

          <div className="flex items-center gap-5 my-4">
            <span className="mb-2">Property Image</span>
            <input type="file" name="propertyImage" className="file-input file-input-bordered w-full max-w-xs" 
             onChange={handleInputChange}/>
          </div>
          <button className="btn btn-accent my-4" disabled={isLoading}>
            {isLoading ?(
                <>
                <Loader className="mr-2 animate-spin"/>
                <span>Loading...</span>
                </>
            ):(
                "Update Property"
            )}
          </button>
        </form>
        {isEditModalOpen && (
          <EditConfirmationModal 
          onConfirm={confirmUpdate}
          onCancel={cancelUpdate}
          />
        )}
      </section>
    </>
  );
};

export default EditProperty;
