import { useState } from "react";
import EnterEmail from "../../components/RegistrationFlow/EnterEmail";
import ConfirmEmail from "../../components/RegistrationFlow/ConfirmEmail";
import CompleteProfile from "../../components/RegistrationFlow/CompleteProfile";
import { useNavigate } from "react-router-dom";

const Register = () => {
const [selected, setSelected] = useState('register');
const [currentStep, setCurrentStep] = useState(1);
const navigate = useNavigate();
const [formData, setFormData] = useState({
  name: "",
  email: "",
  otp: "",
  phone: "",
  address: "",
});

const handleNext = (data) => {
  setFormData((prev) => ({ ...prev, ...data }));
  setCurrentStep((prev) => prev + 1); // Move to next step
};

const handleBack = () => setCurrentStep((prev) => prev - 1);

const handleSelect = (type) => {
setSelected(type);
navigate(`/${type}`);
};

const handleSubmit = () => {
console.log("Final registration data:", formData);
// Submit data to backend (e.g., call an API to register the user)
};

return (
<div className="flex flex-col justify-center items-center p-4 pt-20 bg-gray-50 min-h-screen pb-20">

    <>
        {currentStep === 1 &&
        <>
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
            <EnterEmail onNext={handleNext} />
        </>
        }
        {currentStep === 2 && (
        <ConfirmEmail onNext={handleNext} onBack={handleBack}  email={formData.email} name={formData.name} />
        )}
        {currentStep === 3 && (
        <CompleteProfile formData={formData} onSubmit={handleSubmit} onBack={handleBack} email={formData.email} name={formData.name} />
        )}
    </>
</div>
);
};

export default Register;