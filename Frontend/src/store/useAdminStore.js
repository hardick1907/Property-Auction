import {axiosInstance} from "../lib/axios";
import { create } from "zustand";
import { toast } from "react-toastify";

export const useAdminStore = create((set,get) => ({
    properties: [],
    users: [],
    winnersList: [],
    isLoading: false,

    create: async (data) => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.post("/admin/addnewproperty", data,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            toast.success("Property created successfully!");
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message);
            return false;
        } finally {
            set({ isLoading: false });
        }
    },

    getAllProperties: async () => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.get("/admin/getallproperties");
            set({ properties: res.data || [] });
        } catch (error) {
            console.log("Error in getAllProperties:", error.message);
            set({ properties: [] });
        } finally {
            set({ isLoading: false });
        }
    },

    getAllUsers: async () => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.get("/admin/getallusers");
            set({ users: res.data || [] });
        } catch (error) {
            console.log("Error in getAllUsers:", error.message);
            set({ users: [] });
        } finally {
            set({ isLoading: false });
        }
    },

    getPropertyById: async (id) => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.get(`/admin/getproperty/${id}`);
            return res.data;
        } catch (error) {
            console.log("Error in getPropertyById:", error.message);
            return null;
        } finally {
            set({ isLoading: false });
        }
    },

    editProperty : async (id, data) => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.put(`/admin/updateproperty/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            toast.success("Property updated successfully!");
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message);
            return false;
        } finally {
            set({ isLoading: false });
        }
    },

    deleteProperty : async (id) => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.delete(`/admin/deleteproperty/${id}`);
            toast.success("Property deleted successfully!");
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message);
            return false;
        } finally {
            set({ isLoading: false });
        }
    },

    winners: async () => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.get("/admin/winners");
            set({ winnersList: res.data || [] });
        } catch (error) {
            console.log("Error in winners controller:", error.message);
            set({ winnersList: [] });
        } finally {
            set({ isLoading: false });
        }
    },
}));
