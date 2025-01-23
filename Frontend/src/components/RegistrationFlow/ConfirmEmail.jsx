import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { toast } from 'react-toastify';

const ConfirmEmail = ({ onNext, onBack,email }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const { register, verifyOTP } = useAuthStore();
  
    useEffect(() => {
      if (timer > 0) {
        const interval = setInterval(() => {
          setTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
      } else {
        setCanResend(true);
      }
    }, [timer]);
  
    const handleChange = (value, index) => {
      if (isNaN(value)) return;
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
  
      if (value && index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    };
  
    const handleKeyDown = (e, index) => {
      if (e.key === 'Backspace' && otp[index] === '') {
        if (index > 0) {
          document.getElementById(`otp-input-${index - 1}`).focus();
        }
      }
    };

    const validateForm = () => {
      if (!otp.join('').trim()) return toast.error("OTP is required");
      return true;
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (!validateForm()) {
          return; // Exit if the form is invalid
        }
      
        const success = await verifyOTP({ email, otpCode: otp.join('') });
        if (success) {
          onNext({ email, otp: otp.join('') });
        }
      };
  
    const handleResendOtp = () => {
      setCanResend(false);
      setTimer(60); // Reset timer
      register({ email });
    };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
    <h1 className="text-lg font-semibold mb-4 text-center text-error">*Do not close or refresh this page*</h1>
      <div className="bg-white p-6 shadow-md w-[26rem]">
      
        <h1 className="text-2xl font-semibold text-center mb-4">Confirm OTP</h1>
        <p className="text-gray-600 text-center mb-6">Enter the 6-digit OTP sent to your email</p>

        <div className="flex justify-center gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-xl border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-4"
        >
          Confirm OTP
        </button>

        <div className="text-center">
          <button
            onClick={handleResendOtp}
            disabled={!canResend}
            className={`${
              canResend ? 'text-blue-500 hover:underline' : 'text-gray-400'
            } font-semibold`}
          >
            Resend OTP
          </button>
          {!canResend && (
            <p className="text-gray-500 text-sm mt-2">Resend available in {timer} seconds</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;
