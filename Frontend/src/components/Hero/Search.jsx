import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    location: "",
    propertyType: "",
    priceRange: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    
    if (searchParams.location) {
      queryParams.set("location", searchParams.location);
    }
    if (searchParams.propertyType) {
      queryParams.set("propertyType", searchParams.propertyType);
    }
    if (searchParams.priceRange) {
      queryParams.set("priceRange", searchParams.priceRange);
    }

    navigate(`/auctions?${queryParams.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="p-6 shadow-md bg-base-100 mt-0 rounded-lg">
      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
        <div className="w-full md:w-1/3">
          <label className="block text-base-content text-lg font-bold mb-2">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={searchParams.location}
            onChange={handleInputChange}
            placeholder="Location Name"
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </div>

        <div className="w-full md:w-1/3">
          <label className="block text-base-content text-lg font-bold mb-2">
            Property Type
          </label>
          <select 
            name="propertyType"
            value={searchParams.propertyType}
            onChange={handleInputChange}
            className="input input-bordered input-primary w-full max-w-xs"
          >
            <option value="">Select Category</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Land">Land</option>
            <option value="Specialty">Specialty</option>
          </select>
        </div>

        <div className="w-full md:w-1/3">
          <label className="block text-base-content text-lg font-bold mb-2">
            Price Range
          </label>
          <select 
            name="priceRange"
            value={searchParams.priceRange}
            onChange={handleInputChange}
            className="input input-bordered input-primary w-full max-w-xs"
          >
            <option value="">Choose A Price</option>
            <option value="₹ 10,00,000 - ₹ 20,00,000">₹ 10,00,000 - ₹ 20,00,000</option>
            <option value="₹ 20,00,000 - ₹ 30,00,000">₹ 20,00,000 - ₹ 30,00,000</option>
            <option value="₹ 30,00,000 - ₹ 40,00,000">₹ 30,00,000 - ₹ 40,00,000</option>
            <option value="₹ 40,00,000 - ₹ 50,00,000">₹ 40,00,000 - ₹ 50,00,000</option>
            <option value="₹ 50,00,000 - ₹ 60,00,000">₹ 50,00,000 - ₹ 60,00,000</option>
            <option value="₹ 60,00,000 - ₹ 70,00,000">₹ 60,00,000 - ₹ 70,00,000</option>
            <option value="₹ 70,00,000 - ₹ 80,00,000">₹ 70,00,000 - ₹ 8s0,00,000</option>
          </select>
        </div>

        <div className="w-full md:w-auto mt-4 pt-9 md:mt-0">
          <button type="submit" className="btn btn-primary">
            Explore&nbsp;Now
          </button>
        </div>
      </div>
    </form>
  );
};

export default Search;