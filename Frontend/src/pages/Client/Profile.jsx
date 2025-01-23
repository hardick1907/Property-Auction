import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { ArrowBigDownDash } from "lucide-react";

const Profile = () => {
  const { authUser } = useAuthStore();
  
  // You can omit the `isLoaded` state if you directly check `authUser`
  
  if (!authUser) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-primary-content text-center">Profile</h1>
      <div className="flex justify-center items-center min-h-screen">
        <div className="card-body">
          <div className="flex flex-col md:flex-row items-center gap-10 mt-6">
            {/* Profile Image */}
            <div className="avatar lg:bottom-24">
              <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={`http://localhost:3000/${authUser?.photographDocument}`}
                  alt="Photograph Document"
                />
              </div>
            </div>
            {/* Personal Information */}
            <div className="flex flex-col gap-4">
              <p className="text-lg">
                <strong>Name:</strong> {authUser?.name}
              </p>
              <p className="text-lg">
                <strong>Email:</strong> {authUser?.email}
              </p>
              <p className="text-lg">
                <strong>Mobile:</strong> {authUser?.mobilenumber}
              </p>
              <p className="text-lg">
                <strong>Aadhar Number:</strong> {authUser?.aadharnumber}
              </p>
              <p className="text-lg">
                <strong>{authUser?.applicantrelation}'s Name:</strong>{" "}
                {authUser?.applicantfathername}
              </p>
              <p className="text-lg">
                <strong>Address:</strong> {authUser?.address}, {authUser?.city},{" "}
                {authUser?.pincode}, {authUser?.state}
              </p>
              <p className="text-lg">
                <strong>Date of Birth:</strong> {authUser?.dob ? authUser?.dob.split("T")[0] : "N/A"}
              </p>
              <p className="text-lg">
                <strong>Gender:</strong> {authUser?.sex}
              </p>
              <p className="text-lg">
                <strong>Marital Status:</strong> {authUser?.maritalStatus}
              </p>
            </div>
          </div>
          {/* Documents Section */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4 items-center">
              <p className="text-lg font-bold">Identity Document</p>
              <div className="card bg-base-100 w-full lg:w-96 shadow-xl">
                <figure>
                  <img
                    src={`http://localhost:3000/${authUser?.identityDocument}`}
                    alt="Identity Document"
                  />
                </figure>
              </div>
              <a
                href={`http://localhost:3000/${authUser?.identityDocument}`}
                download
                className="mt-4 text-info"
              >
                <div className="flex flex-row">
                  <ArrowBigDownDash />
                  Identity Document
                </div>
              </a>
            </div>

            <div className="flex flex-col gap-4 items-center">
              <p className="text-lg font-bold">PAN Card Document</p>
              <div className="card bg-base-100 w-full lg:w-96 shadow-xl">
                <figure>
                  <img
                    src={`http://localhost:3000/${authUser?.pancardDocument}`}
                    alt="PAN Card Document"
                  />
                </figure>
              </div>
              <a
                href={`http://localhost:3000/${authUser?.pancardDocument}`}
                download
                className="mt-4 text-info"
              >
                <div className="flex flex-row">
                  <ArrowBigDownDash />
                  PAN Card Document
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
