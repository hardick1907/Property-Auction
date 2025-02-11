import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Link2, Loader, Lock, Mail} from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

export default function AdminLogIn() {

  const {isSigningUp, AdminLogin} = useAuthStore();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    adminID: "",
    password: "",
  });

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.adminID.trim()) return toast.error("Admin ID is required");
    if (!formData.password.trim()) return toast.error("Password is required");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success == true) {
      await AdminLogin(formData);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">

          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <h1 className="text-2xl font-bold mt-2">Admin</h1>
              <p className="text-base-content/60">Login to your account</p>
            </div>
          </div>


          <form className="space-y-5" onSubmit={handleSubmit}>

            <div className="form-control">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base-content/40" />
                </div>
                <input type="email" className="input input-bordered w-full pl-10" placeholder="Email" value={formData.email}
                  onChange={(e)=>
                setFormData({ ...formData, email: e.target.value })
                }
                required
                />
              </div>
            </div>

            <div className="form-control">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Link2 className="h-5 w-5 text-base-content/40" />
                </div>
                <input type="text" name="adminID" className="input input-bordered w-full pl-10" placeholder="Admin Id"
                  value={formData.adminID} onChange={(e)=>
                setFormData({ ...formData, adminID: e.target.value })
                }
                required
                />
              </div>
            </div>


            <div className="form-control">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input type={showPassword ? "text" : "password" } className="input input-bordered w-full pl-10"
                  placeholder="Password" value={formData.password} onChange={(e)=>
                setFormData({ ...formData, password: e.target.value })
                }
                required
                />
                <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={(e)=> {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                  }}
                  >
                  {showPassword ? (
                  <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                  <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className={`btn btn-primary w-full`} disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                <Loader className="mr-2 animate-spin" />
                Logging in
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              I am a{" "}
              <Link to="/login" className="link link-primary">
              Customer
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};