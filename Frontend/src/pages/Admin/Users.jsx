import React, { useEffect, useState } from 'react';
import { useAdminStore } from '../../store/useAdminStore';
import { format } from 'date-fns';
import TableSkeleton from "../../components/Skeletons/TableSkeleton";

const Users = () => {
  const { users, isLoading, getAllUsers } = useAdminStore();
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  useEffect(() => {
    let filtered = users;

    if (searchQuery) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentPageUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col items-center p-4 lg:p-16">
      {/* Search Bar */}
      <div className="flex flex-col lg:flex-row w-full lg:justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by Name, Email, or City"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-bordered w-full lg:w-1/3"
        />
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 text-sm lg:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2">S.No</th>
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Mobile Number</th>
              <th className="border border-gray-300 p-2">State</th>
              <th className="border border-gray-300 p-2">City</th>
              <th className="border border-gray-300 p-2">Aadhar</th>
              <th className="border border-gray-300 p-2">Sex</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="10" className="text-center p-4">
                  <TableSkeleton />
                </td>
              </tr>
            ) : currentPageUsers.length > 0 ? (
              currentPageUsers.map((user, index) => (
                <tr key={user._id} className="text-center hover:bg-gray-50">
                  <td className="border border-gray-300 p-2">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="border border-gray-300 p-2">{user._id}</td>
                  <td className="border border-gray-300 p-2">{user.name}</td>
                  <td className="border border-gray-300 p-2">{user.email}</td>
                  <td className="border border-gray-300 p-2">{user.mobilenumber}</td>
                  <td className="border border-gray-300 p-2">{user.state}</td>
                  <td className="border border-gray-300 p-2">{user.city}</td>
                  <td className="border border-gray-300 p-2">{user.aadharnumber}</td>
                  <td className="border border-gray-300 p-2">{user.sex}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center p-4">
                  No users found.
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

export default Users;
