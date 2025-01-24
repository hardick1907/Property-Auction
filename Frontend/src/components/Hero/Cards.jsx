import { MapPin, Clock } from "lucide-react";
import { useAdminStore } from "../../store/useAdminStore";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Cards = () => {
  const { isLoading, properties, getAllProperties } = useAdminStore();
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [timeLeft, setTimeLeft] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getAllProperties();
  }, [getAllProperties]);

  useEffect(() => {
    const today = new Date();
    const activeProperties = properties.filter((property) => {
      const startDate = new Date(property.startDate);
      const endDate = new Date(property.endDate);
      return today >= startDate && today <= endDate;
    });
    
    setFilteredProperties(activeProperties.slice(0, 3));
  }, [properties]);

  const calculateTimeLeft = (endDate) => {
    const difference = new Date(endDate) - new Date();
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTimeLeft => {
        const newTimeLeft = {};
        filteredProperties.forEach(property => {
          newTimeLeft[property._id] = calculateTimeLeft(property.endDate);
        });
        return newTimeLeft;
      });
    }, 1000);
  
    // Cleanup function to clear the timer
    return () => clearInterval(timer);
  }, [filteredProperties]);
  

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };


  const handleViewDetails = (propertyId) => {
    navigate(`/auctions/${propertyId}`);
  };

  return (
    <div className="flex flex-1 flex-col p-4 mt-24">
      {/* Header */}
      <div className="flex justify-center">
        <h1 className="text-4xl font-bold text-center text-primary">Live Auction</h1>
      </div>

      <div className="flex justify-center">
        <p className="text-center p-3 text-base-content">
          Integer ante tellus, bibendum eget ante ut, aliquet luctus quam. Integer eget ex
          hendrerit mattis mauris.
          <br />
          Vestibulum ante ipsum primis in faucibus orci luctus et.
        </p>
      </div>

      {/* Cards */}
      <div className="flex justify-center flex-wrap gap-6 mt-16">
        {filteredProperties.map((property, idx) => (
          <div key={idx} className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img
                src={property.propertyImage}
                alt="Apartment"
                className="rounded-t-lg h-64 object-cover w-full"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-base-content truncate">
                {property.title}
              </h2>
              
              <div className="flex gap-2 mt-4 text-base-content">
                <MapPin /> <span>{property.city}, {property.state}</span>
              </div>

              {/* Time Left Section */}
              <div className="flex gap-2 items-center mt-2 text-base-content">
                <Clock className="text-primary" />
                <span className="font-medium">Time Left:</span>
                <div className="text-primary">
                  {timeLeft[property._id] && (
                    <span>
                      {timeLeft[property._id].days}d : 
                      {formatTime(timeLeft[property._id].hours)}h : 
                      {formatTime(timeLeft[property._id].minutes)}m : 
                      {formatTime(timeLeft[property._id].seconds)}s
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center mt-5">
                <div className="flex flex-1 flex-col">
                  <h2 className="font-bold text-md text-base-content">Price</h2>
                  <div className="flex">
                   ₹&nbsp;<span className="text-success">{new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(property.propertyPrice)}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleViewDetails(property._id)}
                  className="btn btn-primary"
                >
                  Bid Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-24">
        <Link to="/auctions" className="btn btn-primary">View All</Link>
      </div>
    </div>
  );
};

export default Cards;