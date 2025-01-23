import { Key, Loader, Mail } from 'lucide-react'
import { toast } from "react-toastify";
import authbanner from "../../assets/authbanner.png";  
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

const LoginPage = () => {

  const {isSigningUp,login} = useAuthStore();
  const [selected, setSelected] = useState('login');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSelect = (type) => {
    setSelected(type);
    navigate(`/${type}`);
    };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password.trim()) return toast.error("Password is required");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success == true) {
      await login(formData);
      navigate('/');
    }
  };

  return (
    <div className='flex flex-col justify-center items-center p-4 pt-20 bg-gray-50 min-h-screen pb-20 '>
      <div className="flex flex-col sm:flex-row justify-center mb-10 w-full sm:w-1/2 gap-2 sm:gap-0">
                <button onClick={()=> handleSelect('register')}
                    className={`py-3 px-8 text-xl w-full sm:w-1/2 transition duration-300
                    ${selected === 'register' ? 'bg-primary text-primary-content' : ''}`}
                    >
                    Register
                </button>
                <button onClick={()=> handleSelect('login')}
                    className={`py-3 px-8 text-xl w-full sm:w-1/2 transition duration-300
                    ${selected === 'login' ? 'bg-primary text-primary-content' : ''}`}
                    >
                    Login
                </button>
            </div>
           <div className='flex flex-col lg:flex-row justify-center items-center gap-4 w-full'>
            <div className="relative w-full lg:w-1/2 h-[400px] lg:h-[500px] bg-cover bg-center rounded-lg overflow-hidden" style={{
                            backgroundImage: `url(${authbanner})`,
                          }}>
                    <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-40">
                      <h1 className="text-4xl lg:text-5xl text-white font-semibold text-center px-4">Hello Again</h1>
                      <h2 className="text-xl lg:text-2xl text-white mb-4 text-center px-4">Welcome Back, You've Been Missed</h2>
                    </div>
                  </div>
           <div className="w-full md:w-1/3 bg-white p-8 shadow-lg">
      <h3 className="text-2xl font-semibold mb-6 text-center">Log In</h3>
      <form>

        <div className="form-control m-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="size-5 text-base-content/40" />
            </div>
            <input type="email" className="input input-bordered w-full pl-10" placeholder="Email" name="email"
              value={formData.email} onChange={handleInputChange} />
          </div>
        </div>

        <div className="form-control m-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Key className="size-5 text-base-content/40" />
            </div>
            <input type="password" className="input input-bordered w-full pl-10" placeholder="Password" name="password"
              value={formData.password} onChange={handleInputChange} />
          </div>
        </div>

        <button onClick={handleSubmit} className={`btn btn-primary w-full`} disabled={isSigningUp} >
          {isSigningUp ?(
          <>
            <Loader className="mr-2 animate-spin" />
            Logging in
          </>):
          ("Log In")
          }
        </button>
        <div className='flex justify-center mt-4'>
        <Link to="/adminlogin" className="text-secondary text-center text-sm mt-2">Admin?</Link>
        </div>
      </form>
    </div>
           </div>
    </div>
    
  )
}

export default LoginPage