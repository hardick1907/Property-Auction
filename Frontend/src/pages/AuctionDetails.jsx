import { useEffect, useState } from 'react';
import { useAdminStore } from '../store/useAdminStore';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { format } from "date-fns";
import { useUserStore } from '../store/useUserStore';
import { useAuthStore } from '../store/useAuthStore';

const AuctionDetails = () => {
  const { id } = useParams();
  const { getPropertyById, isLoading } = useAdminStore();
  const { authUser } = useAuthStore();
  const { placeBid, getBidHistory, updateBidHistory, setCurrentBid, auctionData } = useUserStore();
  const socket = useAuthStore(state => state.socket);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login')
  }
  
  const [property, setProperty] = useState(null);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState('description');
  const [timeLeft, setTimeLeft] = useState({});
  const [auctionStatus, setAuctionStatus] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [biddingHistory, setBiddingHistory] = useState([]);
  const currentAuctionData = auctionData[id] || { bids: [], currentBid: null };
  const { bids, currentBid } = currentAuctionData;


  const getAuctionStatus = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) return 'upcoming';
    if (now > end) return 'ended';
    return 'ongoing';
  };

  const calculateTimeLeft = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    const status = getAuctionStatus(startDate, endDate);
    
    if (status === 'upcoming' || status === 'ended') return null;

    const difference = end - now;
    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getPropertyById(id);
        if (data) {
          setProperty(data);
          const status = getAuctionStatus(data.startDate, data.endDate);
          setAuctionStatus(status);
          setTimeLeft(calculateTimeLeft(data.startDate, data.endDate));
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

  useEffect(() => {
    if (property && auctionStatus === 'ongoing') {
      const timer = setInterval(() => {
        const newStatus = getAuctionStatus(property.startDate, property.endDate);
        setAuctionStatus(newStatus);
        setTimeLeft(calculateTimeLeft(property.startDate, property.endDate));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [property, auctionStatus]);

  const handleSelect = (type) => {
    setSelected(type);
  };

  const renderTimeDisplay = () => {
    switch (auctionStatus) {
      case 'upcoming':
        return <span className="font-bold text-2xl">Starting Soon</span>;
      case 'ended':
        return <span className="font-bold text-2xl">Auction Ended</span>;
      case 'ongoing':
        return timeLeft ? (
          <span className="font-bold text-2xl">
            {timeLeft.days} days {formatTime(timeLeft.hours)} hours{' '}
            {formatTime(timeLeft.minutes)} minutes {formatTime(timeLeft.seconds)} sec
          </span>
        ) : (
          <span className="font-bold text-2xl">Auction Ended</span>
        );
      default:
        return null;
    }
  };

  //extraaaaaaaaaaaaaaaaaaaaaaaaaaa

  useEffect(() => {
    if (socket) {
      socket.on("bidPlaced", (data) => {
        console.log("New bid received:", data);
        updateBidHistory(id, data);
      });
      
      socket.on("currentBid", (data) => {
        console.log("New current bid received:", data);
        setCurrentBid(id, data);
      });

      return () => {
        socket.off("bidPlaced");
        socket.off("currentBid");
      };
    }
  }, [socket, id, updateBidHistory, setCurrentBid]);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getPropertyById(id);
        if (data) {
          setProperty(data);
          const status = getAuctionStatus(data.startDate, data.endDate);
          setAuctionStatus(status);
          setTimeLeft(calculateTimeLeft(data.startDate, data.endDate));
          await getBidHistory(id);
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
  }, [id, getPropertyById, getBidHistory]);


  

  const handlePlaceBid = async () => {
    if (!socket) {
      console.error("Socket connection not available");
      return;
    }

    try {
      const success = await placeBid({ id, bidAmount });
      if (success) {
        setBidAmount('');
      }
    } catch (error) {
      console.error("Error placing bid:", error);
    }
  };  
  
  const renderBiddingHistory = () => (
    <div className="overflow-x-auto w-full">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Bidder</th>
            <th>Bid Amount</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {bids.length > 0 ? (
            bids
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .map((bid, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img 
                          src={bid.bidder.photographDocument} 
                          alt="Avatar" 
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{bid.bidder.name}</div>
                    </div>
                  </div>
                </td>
                <td>₹ {new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(bid.bidAmount)}</td>
                <td>{format(new Date(bid.timestamp), 'MMM d, yyyy hh:mm:ss a')}</td>
              </tr>
          ))
          ):(
            <tr>
              <td colSpan="4" className='text-xl text-center font-bold'>No bids yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  


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

  return (
<div className="p-4 pt-24 lg:p-24">
  <section className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4 justify-between bg-neutral text-white p-4 rounded-md w-full">
        <div>
          <p>Current Bid</p>
          <h5 className="text-2xl font-bold">
            ₹ {new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(currentBid || property.currentBidAmount)}
          </h5>
        </div>
        <div>
          <h5>
            <span>Time Left: </span>
          </h5>
          {renderTimeDisplay()}
        </div>
      </div>
      <div className="card w-full shadow-xl">
        <figure className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[400px] overflow-hidden">
          <img
            src={property.propertyImage}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        </figure>
      </div>

      <div className='flex flex-col rounded-md bg-neutral gap-4 h-[140px] text-white p-4'>
        <h1 className='text-xl font-bold'>Location: </h1>
        <p className='text-lg'>{property.address}, {property.city}, {property.pincode ||"not"}, {property.state||""}</p>
      </div>
    </div>

    <div className='flex flex-col gap-6'>
      <div className='flex flex-row gap-4 justify-between h-auto lg:h-[90px] rounded-md w-full'>
        <h1 className='text-xl font-bold'>{property.title}</h1>
      </div>

      <div className='flex flex-col gap-4'>
        <div className='flex flex-row gap-4 justify-center items-center'>
          <button onClick={() => handleSelect('description')}
            className={`py-2 px-4 font-semibold text-md transition duration-300
            ${selected === 'description' ? 'bg-neutral text-neutral-content' : ''}`}
          >
            Description
          </button>
          <button onClick={() => handleSelect('details')}
            className={`py-2 px-4 font-semibold text-md transition duration-300
            ${selected === 'details' ? 'bg-neutral text-neutral-content' : ''}`}
          >
            Details
          </button>
        </div>

        <div className='flex-1 overflow-hidden'>
          <div className='h-[333px] overflow-hidden'>
            {selected === 'description' && (
              <div className="h-[200px] md:h-[300px] overflow-y-auto">
                <p className='text-lg'>
                  {property.auctionBrief}
                </p>
              </div>
            )}
            {selected === 'details' && (
              <>
                <div className='mt-4 flex flex-col text-lg'>
                  <div className='flex flex-row gap-4 justify-between mb-3 pb-1 border-b-2 border-dotted'>
                    <p><span className='font-bold'>Category : </span></p>
                    <span>{property.category}</span>
                  </div>
                  <div className='flex flex-row gap-4 justify-between mb-3 pb-1 border-b-2 border-dotted'>
                    <p><span className='font-bold'>Area (in sq. mt.) : </span></p>
                    <span>{property.area}</span>
                  </div>
                  <div className='flex flex-row gap-4 justify-between mb-3 pb-1 border-b-2 border-dotted'>
                    <p><span className='font-bold'>Reserved Price : </span></p>
                    <span>₹ {new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(property.reservedPrice)}</span>
                  </div>
                  <div className='flex flex-row gap-4 justify-between mb-3 pb-1 border-b-2 border-dotted'>
                    <p><span className='font-bold'>Property Price : </span></p>
                    <span>₹ {new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(property.propertyPrice)}</span>
                  </div>
                  <div className='flex flex-row gap-4 justify-between mb-3 pb-1 border-b-2 border-dotted'>
                    <p><span className='font-bold'>EMD Amount : </span></p>
                    <span>₹ {new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(property.emdAmount)}</span>
                  </div>
                  <div className='flex flex-row gap-4 justify-between mb-3 pb-1 border-b-2 border-dotted'>
                    <p><span className='font-bold'>Start Date: </span></p>
                    <span>{format(new Date(property.startDate), 'MMM d, yyyy')}</span>
                  </div>
                  <div className='flex flex-row gap-4 justify-between mb-3 pb-1 border-b-2 border-dotted'>
                    <p><span className='font-bold'>End Date : </span></p>
                    <span>{format(new Date(property.endDate), 'MMM d, yyyy')}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className='flex flex-col gap-1 rounded-md bg-neutral text-white p-4'>
            <h1 className='text-xl font-bold'>BID NOW </h1>
            <div className='flex gap-6'>
              <p>Minimun Bid Amount: ₹ {new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(property.minimunBidAmount)}</p>
              <p>Starting Bid Amount: ₹ {new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(property.startingBidAmount)}</p>
            </div>
            <div className='flex flex-row gap-4'>
              <input 
                type="number" 
                className='input input-bordered w-full text-black'
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
              />
              {
                auctionStatus === 'ongoing' ? (
                  authUser ? (
                    <button onClick={handlePlaceBid} className='btn btn-primary'>Bid</button>
                  ) : (
                    <button onClick={handleLogin} className='btn btn-primary'>Login to Bid</button>
                  )
                ) : (
                  <button disabled className="btn btn-disabled ">
                    {auctionStatus === 'upcoming' ? 'Auction Not Started' : 'Auction Ended'}
                  </button>
                )
              }

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <div className='pt-10 flex flex-col justify-center items-center'>
    <h1 className='text-3xl font-bold'>Bidding History</h1>
    {renderBiddingHistory()}
  </div>
</div>

  );
};

export default AuctionDetails;