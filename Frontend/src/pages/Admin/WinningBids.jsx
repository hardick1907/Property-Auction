import React, { useEffect } from "react";
import { useAdminStore } from "../../store/useAdminStore";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

const WinningBids = () => {
  const { winnersList, isLoading, winners } = useAdminStore();

  useEffect(() => {
    winners();
    console.log("Winners:", winnersList);
  }, [winners]);


  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center mb-6">Winning Bids</h1>
      {isLoading ? (
        <div className="flex justify-center">
          <Loader2 className="animate-spin text-blue-500 text-4xl" />
        </div>
      ) : winnersList.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 font-medium text-gray-700">#</th>
                <th className="px-4 py-2 font-medium text-gray-700">Property Name</th>
                <th className="px-4 py-2 font-medium text-gray-700">Photo</th>
                <th className="px-4 py-2 font-medium text-gray-700">Winner Name</th>
                <th className="px-4 py-2 font-medium text-gray-700">Winner Email</th>
                <th className="px-4 py-2 font-medium text-gray-700">Winner Mobile</th>
                <th className="px-4 py-2 font-medium text-gray-700">Winning Bid</th>
                <th className="px-4 py-2 font-medium text-gray-700">Date Booked</th>
              </tr>
            </thead>
            <tbody>
              {winnersList.map((winner, index) => (
                <tr key={winner._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{winner.title}</td>
                  <td className="px-4 py-2">
                    <img
                      className="w-12 h-12 object-cover rounded-full"
                      src={`http://localhost:3000/${winner.highestBidder.photographDocument}`}
                      alt="profile"
                    />
                  </td>
                  <td className="px-4 py-2">{winner.highestBidder.name}</td>
                  <td className="px-4 py-2">{winner.highestBidder.email}</td>
                  <td className="px-4 py-2">{winner.highestBidder.mobilenumber}</td>
                  <td className="px-4 py-2">₹ {new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(winner.currentBidAmount)}</td>
                  <td className='px-4 py-2 truncate'>{format(new Date(winner.endDate), 'MMM d, yyyy')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No winners found.</p>
      )}
    </div>
  );
};

export default WinningBids;
