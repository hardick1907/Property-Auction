import { useEffect, useState } from "react";
import { useUserStore } from "../../store/useUserStore";
import { format } from "date-fns";

const MyBiddings = () => {
  const { myBids, isLoading } = useUserStore();
  const [userBids, setUserBids] = useState([]);

  useEffect(() => {
    const fetchBids = async () => {
      const fetchedBids = await myBids();
      setUserBids(fetchedBids);
    };
    fetchBids();
  }, [myBids]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Biddings</h1>

      {isLoading ? (
        <div className="text-center p-4">Loading...</div>
      ) : userBids.length === 0 ? (
        <p className="text-gray-600 text-center">You have not placed any bids yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userBids.map((property) => (
            <div
              key={property._id}
              className="border rounded-lg overflow-hidden shadow-sm"
            >
              {/* Property Image */}
              {property.propertyImage && (
                <img
                  src={property.propertyImage}
                  alt={property.propertyName}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-4">
                {/* Property Name */}
                <h2 className="text-xl font-semibold mb-2">
                  {property.propertyName}
                </h2>

                <div className="mt-4">
                  {/* Bidding History */}
                  <h3 className="font-medium mb-2">Bidding History:</h3>
                  {property.biddingHistory?.length > 0 ? (
                    <div className="max-h-60 overflow-y-auto"> {/* Added scrolling */}
                      <ul className="space-y-2">
                        {property.biddingHistory
                          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                          .map((bid, index) => (
                            <li
                              key={index}
                              className="flex justify-between items-center py-1 border-b"
                            >
                              <div className="flex items-center gap-2">
                                {/* Bidder Image */}
                                {bid.bidder.photographDocument && (
                                  <img
                                    src={bid.bidder.photographDocument}
                                    alt={bid.bidder.name}
                                    className="w-8 h-8 rounded-full object-cover"
                                  />
                                )}
                                {/* Bidder Name */}
                                <span className="font-medium">
                                  {bid.bidder.name}
                                </span>
                              </div>
                              <div className="text-right">
                                {/* Bid Amount */}
                                <span className="text-green-600 block">
                                  ₹ {new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(bid.bidAmount)}
                                </span>
                                {/* Timestamp */}
                                <span className="text-sm text-gray-500">
                                  {format(new Date(bid.timestamp), 'MMM d, yyyy hh:mm:ss a')}
                                </span>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-gray-500">No bidding history available.</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBiddings;
