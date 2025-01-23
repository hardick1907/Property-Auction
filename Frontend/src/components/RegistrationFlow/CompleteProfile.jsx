import { Eye, EyeOff, Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/useAuthStore";
import {useNavigate} from 'react-router-dom';

const CompleteProfile = ({email, name}) => {
  const { register, isSigningUp } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name,
    email,
    password: '',
    confirmPassword: '',
    mobilenumber: '',
    aadharnumber: '',
    applicantfathername: '',
    applicantrelation: '',
    pannumber: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    dob: '',
    sex: '',
    maritalStatus: '',
    identityDocument: null,
    pancardDocument: null,
    photographDocument: null,
    acceptConditions: false
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    if (!formData.password.trim()) {
      toast.error("Password is required");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    if (formData.mobilenumber.length !== 10) {
      toast.error("Mobile number should be 10 digits");
      return false;
    }
    if (formData.aadharnumber.length !== 12) {
      toast.error("Aadhar number should be 12 digits");
      return false;
    }
    if (!formData.applicantfathername.trim()) {
      toast.error("Father's name is required");
      return false;
    }
    if (!formData.applicantrelation.trim()) {
      toast.error("Relation is required");
      return false;
    }
    if (formData.pannumber.length !== 10) {
      toast.error("PAN number should be 10 characters");
      return false;
    }
    if (!formData.address.trim()) {
      toast.error("Address is required");
      return false;
    }
    if (!formData.city.trim()) {
      toast.error("City is required");
      return false;
    }
    if (!formData.state.trim()) {
      toast.error("State is required");
      return false;
    }
    if (formData.pincode.length !== 6) {
      toast.error("Pincode should be 6 digits");
      return false;
    }
    if (!formData.dob.trim()) {
      toast.error("Date of birth is required");
      return false;
    }
    if (!formData.sex.trim()) {
      toast.error("Sex is required");
      return false;
    }
    if (!formData.maritalStatus.trim()) {
      toast.error("Marital status is required");
      return false;
    }
    if (!formData.identityDocument) {
      toast.error("Identity document is required");
      return false;
    }
    if (!formData.pancardDocument) {
      toast.error("PAN card document is required");
      return false;
    }
    if (!formData.photographDocument) {
      toast.error("Photograph document is required");
      return false;
    }
    if (!formData.acceptConditions) {
      toast.error("Please accept the terms and conditions");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      if (key !== 'confirmPassword') {
        submitData.append(key, formData[key]);
      }
    });

    const success = await register(submitData);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md p-6">
        <h2 className="text-4xl font-bold mb-4 text-center text-primary">Registration Form</h2>
        <p className="mb-6 text-center text-info">
          Please fill the following form to process further, fields marked as
          <span className="text-red-500">*</span> are mandatory.
        </p>
        <h1 className="font-semibold mb-4 text-center text-error">Do not close or refresh this page.</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <h1 className='text-lg font-bold'>Create Password</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ marginBottom: "50px" }}>
            <div className="flex flex-col relative">
              <label className="font-semibold">Password<span className="text-red-500">*</span></label>
              <input 
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full"
              />
              <button type="button" className="absolute right-3 top-10 text-gray-600" onClick={togglePasswordVisibility}>
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>
            <div className="flex flex-col relative">
              <label className="font-semibold">Confirm Password<span className="text-red-500">*</span></label>
              <input 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm Password"
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full"
              />
              <button type="button" className="absolute right-3 top-10 text-gray-600" onClick={togglePasswordVisibility}>
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>
          </div>

          <h1 className='text-lg font-bold'>Details</h1>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className="flex flex-col">
              <label className="font-semibold">Applicant Name<span className="text-red-500">*</span></label>
              <input 
                name="name"
                value={formData.name}
                type="text"
                className="input input-bordered w-full"
                disabled
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">Email Id<span className="text-red-500">*</span></label>
              <input 
                name="email"
                value={formData.email}
                type="text"
                className="input input-bordered w-full"
                disabled
              />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className="flex flex-col">
              <label className="font-semibold">Mobile Number<span className="text-red-500">*</span></label>
              <input 
                name="mobilenumber"
                value={formData.mobilenumber}
                onChange={handleInputChange}
                placeholder="Mobile Number"
                type="text"
                maxLength={10}
                className="input input-bordered w-full"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">Aadhar Number<span className="text-red-500">*</span></label>
              <input 
                name="aadharnumber"
                value={formData.aadharnumber}
                onChange={handleInputChange}
                placeholder="Aadhar Number"
                type="text"
                maxLength={12}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className="flex flex-col">
              <label className="font-semibold">Applicant Father/Husband Name<span className="text-red-500">*</span></label>
              <input 
                name="applicantfathername"
                value={formData.applicantfathername}
                onChange={handleInputChange}
                placeholder="Applicant Father/Husband Name"
                type="text"
                className="input input-bordered w-full"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">Father / Husband<span className="text-red-500">*</span></label>
              <select 
                name="applicantrelation"
                value={formData.applicantrelation}
                onChange={handleInputChange}
                className="input input-bordered w-full"
              >
                <option value="">Select</option>
                <option value="Father">Father</option>
                <option value="Husband">Husband</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">PAN Number<span className="text-red-500">*</span></label>
            <input 
              name="pannumber"
              value={formData.pannumber}
              onChange={handleInputChange}
              placeholder="PAN Number"
              type="text"
              maxLength={10}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <h3 className="font-semibold mb-2">Address</h3>
            <div className="flex flex-col mb-4">
              <label className="font-semibold">Address<span className="text-red-500">*</span></label>
              <textarea 
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address"
                className="input input-bordered w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className='flex flex-col'>
                <label className="font-semibold">City<span className="text-red-500">*</span></label>
                <input 
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  className="input input-bordered w-full"
                />
              </div>

              <div className='flex flex-col'>
                <label className="font-semibold">State<span className="text-red-500">*</span></label>
                <select 
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                >
                  <option value="">Select state</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="font-semibold">Pincode<span className="text-red-500">*</span></label>
                <input 
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="Pincode"
                  type="text"
                  maxLength={6}
                  className="input input-bordered w-full"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label className="font-semibold">Date of Birth<span className="text-red-500">*</span></label>
              <input 
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                type="date"
                className="input input-bordered w-full"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">Sex<span className="text-red-500">*</span></label>
              <select 
                name="sex"
                value={formData.sex}
                onChange={handleInputChange}
                className="input input-bordered w-full"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">Marital Status<span className="text-red-500">*</span></label>
              <select 
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleInputChange}
                className="input input-bordered w-full"
              >
                <option value="">Select</option>
                <option value="married">Married</option>
                <option value="single">Single</option>
              </select>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col space-y-2">
              <label className="font-semibold">
                Upload Identity Document
                <span className="text-red-500">*</span>
              </label>
              <input 
                type="file"
                name="identityDocument"
                onChange={handleInputChange}
                className="file-input file-input-bordered w-full max-w-xs"
                accept=".jpg,.jpeg,.png,.pdf"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="font-semibold">
                Upload PAN Card Document
                <span className="text-red-500">*</span>
              </label>
              <input 
                type="file"
                name="pancardDocument"
                onChange={handleInputChange}
                className="file-input file-input-bordered w-full max-w-xs"
                accept=".jpg,.jpeg,.png,.pdf"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="font-semibold">
                Upload Photograph
                <span className="text-red-500">*</span>
              </label>
              <input 
                type="file"
                name="photographDocument"
                onChange={handleInputChange}
                className="file-input file-input-bordered w-full max-w-xs"
                accept=".jpg,.jpeg,.png"
              />
            </div>

            <div className="flex items-start gap-2">
              <input 
                type="checkbox"
                name="acceptConditions"
                checked={formData.acceptConditions}
                onChange={handleInputChange}
                className="mt-1"
              />
              <p className="text-sm text-gray-700">
                I agree to abide by the conditions contained, the extant Rules and Regulation and department decisions framed thereunder or any other order, instruction duly issued by the department from time to time. In case of voluntary withdrawal from the scheme for any reason whatsoever, I/we will not claim any interest on the deposited amount. I/We have read the contents relating to the terms and condition of a property, in detail as mentioned on the Brochure and hereby agree to abide fully by the terms and conditions.
              </p>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-full"
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <>
                <Loader className="mr-2 animate-spin" />
                Signing Up
              </>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;