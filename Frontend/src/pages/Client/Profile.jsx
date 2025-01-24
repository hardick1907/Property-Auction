import { useAuthStore } from "../../store/useAuthStore";

const Profile = () => {
  const { authUser } = useAuthStore();
  
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
                  src={authUser?.photographDocument}
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
        </div>
      </div>
    </>
  );
};

export default Profile;
