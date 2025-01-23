import { Facebook, Instagram } from "lucide-react";
import { useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  const { isLoading, postReview } = useUserStore() || {};
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formdata.name.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (!formdata.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!emailRegex.test(formdata.email)) {
      toast.error("Please enter a valid email");
      return false;
    }
    if (!formdata.message.trim()) {
      toast.error("Message is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const success = await postReview?.(formdata);
      if (success) {
        navigate("/");
      }
    }
  };

  return (
    <div className="flex flex-col pt-24 justify-center items-center px-4 sm:px-6 lg:px-8 pb-4">
      <div className="flex flex-col justify-center items-center gap-4">
        <h3 className="text-3xl font-bold text-center">
          Any Questions for the Officers?
        </h3>
        <p className="text-center">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered
          <br />
          alteration in some form, by injected humour, or randomised words.
        </p>
      </div>

      <div className="flex flex-wrap lg:flex-nowrap lg:gap-10 gap-6 w-full mt-10 px-24">
        {/* Contact Us box */}
        <div className="flex flex-col gap-5 w-full lg:w-7/12 shadow-lg px-6 py-8 bg-base-100 rounded-md h-[450px]">
          <h1 className="text-2xl font-bold">Contact Us</h1>
          <div className="flex flex-col gap-2 text-md border-2 p-4 hover:bg-neutral hover:text-neutral-content transition duration-400">
            <span className="font-bold">Let's Talk</span>
            <a href="mailto:propertyauctiontest@gmail.com" className="mail">
              propertyauctiontest@gmail.com
            </a>
            <a href="tel:8801761111456" className="phone">
              +11 1111111111
            </a>
          </div>
          <div className="flex flex-col gap-2 text-md border-2 p-4 hover:bg-neutral hover:text-neutral-content transition duration-400">
            <span className="font-bold">Location</span>
            <span>168/170, Ave 01, Streets Suite 66xyz</span>
          </div>
          <div className="flex flex-col gap-2 text-md border-2 p-4 hover:bg-neutral hover:text-neutral-content transition duration-400">
            <span className="font-bold">Social Site Link</span>
            <div className="flex flex-row gap-4">
              <a href="https://www.facebook.com">
                <Facebook />
              </a>
              <a href="https://www.instagram.com">
                <Instagram />
              </a>
            </div>
          </div>
        </div>

        {/* Feedback box */}
        <div className="flex flex-col gap-4 w-full lg:w-7/12 px-6 py-8 shadow-lg bg-base-100 rounded-md">
          <h1 className="text-2xl font-bold">Leave Feedback</h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                className="input input-bordered w-full"
                value={formdata.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
                value={formdata.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Message</label>
              <textarea
                rows={7}
                name="message"
                className="textarea textarea-bordered w-full"
                value={formdata.message}
                onChange={handleInputChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-secondary w-full lg:w-1/4"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
