import {axiosInstance} from "../lib/axios";
import { create } from "zustand";
import { toast } from "react-toastify";
import {io} from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000/":"/";

export const useAuthStore = create((set,get) => ({
  authUser: null,
  authAdmin: null,
  isSigningUp: false,
  isCheckingAuth: true,
  socket: null,

  sendOTP: async (data) => {
    set({ isSigningUp: true });
    try {
        const res = await axiosInstance.post("/user/send-otp", data);
        toast.success("OTP sent to your email");
        return true; // Return true on success
    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to send OTP");
        return false; // Return false if failure
    } finally {
        set({ isSigningUp: false });
    }
  },

  verifyOTP: async (data) => {
    set({ isSigningUp: true });
    try {
        const res = await axiosInstance.post("/user/verify-otp", data);
        toast.success("OTP verified successfully");
        return true; // Return true on success  
    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to verify OTP");
        return false; // Return false if failure
    } finally {
        set({ isSigningUp: false });
    }
  },

  register: async (formData) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/user/register", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        
      });
      set({ authUser: res.data });
      toast.success("Registration successful!");
      get().connectSocket();
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      return false;
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/user/login", data);
      toast.success("Login successful!");
      set({ authUser: res.data });
      get().connectSocket();
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      return false;
    } finally {
      set({ isSigningUp: false });
    }
  },

  AdminLogin : async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/admin/login", data);
      toast.success("Login successful!");
      set({ authAdmin: res.data });
      get().connectSocket();
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      return false;
    } finally {
      set({ isSigningUp: false });
    }
  },

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/user/checkAuth");
      set({authUser: res.data})
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error.message);
      set({authUser: null});
    } finally {
      set({isCheckingAuth: false})
    }
  },

  checkAdminAuth: async () => {
    try {
      const res = await axiosInstance.get("/admin/checkAdminAuth");
      set({authAdmin: res.data})
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error.message);
      set({authAdmin: null});
    } finally {
      set({isCheckingAuth: false})
    }
  },

  logout: async () => {
    try {
      await axiosInstance.get("/user/logout");
      set({authUser: null});
      get().disconnectSocket();
    } catch (error) {
      console.log("Error in logout:", error.message);
    }
  },

  adminLogout: async () => {
    try {
      await axiosInstance.get("/admin/logout");
      set({authAdmin: null});
      get().disconnectSocket();
    } catch (error) {
      console.log("Error in logout:", error.message);
    }
  },

  connectSocket: () => {

    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL);
    socket.connect();

    set({ socket: socket });
  },

  disconnectSocket: () => {
    if(get().socket?.connected) get().socket.disconnect();
  },

}));
