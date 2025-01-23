import { Link } from "react-router-dom";
import authbanner from "../../assets/authbanner.png";  
import { Loader, Mail, User } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/useAuthStore.js";

const EnterEmail = ({ onNext }) => {

  const {sendOTP,isSigningUp} = useAuthStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const validateForm = () => {
    if (!formData.name.trim()) return toast.error("Name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");return true;
  };

  const handleInputChange=(e)=> {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const success = await sendOTP(formData);
      if (success) {
        onNext({ email: formData.email, name: formData.name });
      }
    }
  };


  return (
    <div className="flex flex-col lg:flex-row justify-center items-center gap-4 w-full">
      <div className="relative w-full lg:w-1/2 h-[400px] lg:h-[500px] bg-cover bg-center rounded-lg overflow-hidden" style={{
                backgroundImage: `url(${authbanner})`,
              }}>
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-40">
          <h1 className="text-4xl lg:text-5xl text-white font-semibold text-center px-4">Hello Again</h1>
          <h2 className="text-xl lg:text-2xl text-white mb-4 text-center px-4">Welcome Back, You've Been Missed</h2>
        </div>
      </div>
      <div className="w-full md:w-1/3 bg-white p-8 shadow-lg">
        <h3 className="text-2xl font-semibold mb-6 text-center">Register</h3>
        <form onSubmit={handleSubmit}>

          <div className="form-control m-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="size-5 text-base-content/40" />
              </div>
              <input type="text" className="input input-bordered w-full pl-10" placeholder="Full Name" name="name"
                value={formData.name} onChange={handleInputChange} />
            </div>
          </div>

          <div className="form-control m-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="size-5 text-base-content/40" />
              </div>
              <input type="email" className="input input-bordered w-full pl-10" placeholder="Email" name="email"
                value={formData.email} onChange={handleInputChange} />
            </div>
          </div>

          <button type="submit" className={`btn btn-primary w-full`} disabled={isSigningUp}>
            {isSigningUp ?(
            <>
              <Loader className="mr-2 animate-spin" />
              Sending OTP
            </>):
            ("Send OTP")
            }
          </button>
        </form>
      </div>
    </div>

  );
};

export default EnterEmail;