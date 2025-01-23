import { CirclePlus, Crown, Gavel, List, UserRoundPen, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Dashbar = () => {
  const {authUser,authAdmin} = useAuthStore();
  const navigate = useNavigate();

  const buttonClass =
    "flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-gray-200 hover:bg-gray-700 hover:text-white transition duration-200";

  return (
    <header className="header flex items-center justify-center bg-secondary text-secondary-content shadow-lg p-4">
      {authAdmin && (
        <div className="buttons flex flex-col lg:flex-row justify-center items-center gap-6">
        <button
          onClick={() => navigate("/dashboard/listings")}
          className={buttonClass}
        >
          <List />
          <span>Listings</span>
        </button>
        <button
          onClick={() => navigate("/dashboard/addproperty")}
          className={buttonClass}
        >
          <CirclePlus />
          <span>Add New Property</span>
        </button>
        <button
          onClick={() => navigate("/dashboard/users")}
          className={buttonClass}
        >
          <Users />
          <span>Users</span>
        </button>
        <button
          onClick={() => navigate("/dashboard/winningbids")}
          className={buttonClass}
        >
          <Crown />
          <span>Winning Bids</span>
        </button>
      </div>
      )}
      {authUser && (
        <div className="buttons flex flex-col lg:flex-row justify-center items-center gap-6">
        <button
          onClick={() => navigate("/userdashboard/profile")}
          className={buttonClass}
        >
          <UserRoundPen />
          <span>Profile</span>
        </button>
        <button
          onClick={() => navigate("/userdashboard/biddings")}
          className={buttonClass}
        >
          <Gavel />
          <span>My Biddings</span>
        </button>
      </div>
      )}
    </header>
  );
};

export default Dashbar;
