import { useState } from "react";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAdminStore } from "../../store/useAdminStore";

const AddProperty = () => {
  const navigate = useNavigate();
  const { create, isLoading } = useAdminStore();
  const [formdata, setFormData] = useState({
    title: "",
    category: "",
    institute: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    area: "",
    reservedPrice: "",
    propertyPrice: "",
    emdAmount: "",
    startingBidAmount: "",
    minimunBidAmount: "",
    startDate: "",
    endDate: "",
    auctionBrief: "",
    propertyImage: null,
  });

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

  const validateForm = () => {
    if (!formdata.title.trim()) return toast.error("Title is required");
    if (!formdata.category.trim()) return toast.error("Category is required");
    if (!formdata.institute.trim()) return toast.error("Institute is required");
    if (!formdata.address.trim()) return toast.error("Address is required");
    if (!formdata.city.trim()) return toast.error("City is required");
    if (!formdata.state.trim()) return toast.error("State is required");
    if (!formdata.pincode.trim()) return toast.error("Pincode is required");
    if (!formdata.reservedPrice.trim()) return toast.error("Reserved Price is required");
    if (!formdata.emdAmount.trim()) return toast.error("EMD Amount is required");
    if (!formdata.startingBidAmount.trim()) return toast.error("Starting Bid Amount is required");
    if (!formdata.minimunBidAmount.trim()) return toast.error("Minimum Bid Amount is required");
    if (!formdata.startDate.trim()) return toast.error("Start Date is required");
    if (!formdata.endDate.trim()) return toast.error("End Date is required");
    if (!formdata.auctionBrief.trim()) return toast.error("Auction Brief is required");
    if (!formdata.propertyImage) return toast.error("Property Image is required");

    // Validate dates
    const start = new Date(formdata.startDate);
    const end = new Date(formdata.endDate);
    const today = new Date();

    if (start < today) {
      toast.error("Start date cannot be in the past");
      return false;
    }

    if (end <= start) {
      toast.error("End date must be after start date");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const success = await create(formdata);
      console.log("frontend: ",formdata);
      if (success) {
        navigate("/dashboard/listings");
      }
    }
  };
  return (
    <>
      <section className="p-4">
        <h1 className="text-2xl font-bold text-center">Create Auction</h1>
        <hr className="my-4 border-gray-300" />
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2">Title</label>
            <input
              type="text"
              name="title"
              className="input input-bordered w-full"
              value={formdata.title}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block mb-2">Auction Category</label>
            <select
              name="category"
              className="select select-bordered w-full"
              value={formdata.category}
              onChange={handleInputChange}
            >
              <option value="">Select Category</option>
              <option value="Residential">Residential Property</option>
              <option value="Commercial">Commercial Property</option>
              <option value="Land">Land</option>
              <option value="Specialty">Specialty Property</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Institute Name (Bank Name)</label>
            <input
              type="text"
              name="institute"
              className="input input-bordered w-full"
              value={formdata.institute}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block mb-2">Address</label>
            <textarea
              name="address"
              className="textarea textarea-bordered w-full"
              value={formdata.address}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-2">City</label>
              <input
                type="text"
                name="city"
                className="input input-bordered w-full"
                value={formdata.city}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-2">State</label>
              <select
                name="state"
                className="select select-bordered w-full"
                value={formdata.state}
                onChange={handleInputChange}
              >
                <option value="">Select State</option>
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
            <div>
              <label className="block mb-2">Pincode</label>
              <input
                type="number"
                name="pincode"
                className="input input-bordered w-full"
                value={formdata.pincode}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label className="block mb-2">Area (In Sq.mt)</label>
            <input
              type="number"
              name="area"
              className="input input-bordered w-full"
              value={formdata.area}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-2">Property Price</label>
              <input
                type="number"
                name="propertyPrice"
                className="input input-bordered w-full"
                value={formdata.propertyPrice}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-2">Reserved Price</label>
              <input
                type="number"
                name="reservedPrice"
                className="input input-bordered w-full"
                value={formdata.reservedPrice}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-2">EMD Amount</label>
              <input
                type="number"
                name="emdAmount"
                className="input input-bordered w-full"
                value={formdata.emdAmount}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block mb-2">Starting Bid Amount</label>
              <input
                type="number"
                name="startingBidAmount"
                className="input input-bordered w-full"
                value={formdata.startingBidAmount}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block mb-2">Minimun Bid Amount</label>
              <input
                type="number"
                name="minimunBidAmount"
                className="input input-bordered w-full"
                value={formdata.minimunBidAmount}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-2">Start Date</label>
              <input
                type="date"
                name="startDate"
                className="input input-bordered w-full"
                value={formdata.startDate}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-2">End Date</label>
              <input
                type="date"
                name="endDate"
                className="input input-bordered w-full"
                value={formdata.endDate}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label className="block mb-2">Auction Brief</label>
            <textarea
              name="auctionBrief"
              className="textarea textarea-bordered w-full"
              value={formdata.auctionBrief}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div>
            <label className="block mb-2">Property Image</label>
            <input
              type="file"
              name="propertyImage"
              className="file-input file-input-bordered w-full"
              onChange={handleInputChange}
            />
          </div>

          <button className="btn btn-accent w-1/50" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader className="mr-2 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              "Add Property"
            )}
          </button>
        </form>
      </section>
    </>
  );
};

export default AddProperty;