import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";

export const useUserStore = create((set, get) => ({
    isLoading: false,
    reviews: [],
    auctionData: {}, // Format: { [auctionId]: { bids: [], currentBid: null } }

    postReview: async (data) => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.post("/user/postreview", data);
            toast.success("Review posted successfully!");
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message);
            return false;
        } finally {
            set({ isLoading: false });
        }
    },

    allReviews: async () => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.get("/user/allreviews");
            return res.data;
        } catch (error) {
            console.log("Error in allReview:", error.message);
            return [];
        } finally {
            set({ isLoading: false });
        } 
    },

    placeBid: async (data) => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.post(`/user/placebid/${data.id}`, { bidAmount: data.bidAmount });
            toast.success("Bid placed successfully!");
            return true;
        } catch (error) {
            console.error("Error placing bid:", error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message);
            return false;
        } finally {
            set({ isLoading: false });
        }
    },

    getBidHistory: async (auctionId) => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.get(`/user/property/${auctionId}/bidhistory`);
            const bids = res.data || [];
            
            const currentBid = bids.length > 0 
                ? Math.max(...bids.map(bid => bid.bidAmount))
                : null;

            set(state => ({
                auctionData: {
                    ...state.auctionData,
                    [auctionId]: { bids, currentBid }
                }
            }));
            
            return bids;
        } catch (error) {
            console.error("Error fetching bid history:", error.response?.data?.message || error.message);
            return [];
        } finally {
            set({ isLoading: false });
        }
    },

    updateBidHistory: (auctionId, newBid) => {
        set(state => {
            const auctionData = state.auctionData[auctionId] || { bids: [], currentBid: null };
            return {
                auctionData: {
                    ...state.auctionData,
                    [auctionId]: {
                        bids: [newBid, ...auctionData.bids],
                        currentBid: newBid.bidAmount
                    }
                }
            };
        });
    },

    setCurrentBid: (auctionId, amount) => {
        set(state => ({
            auctionData: {
                ...state.auctionData,
                [auctionId]: {
                    ...state.auctionData[auctionId],
                    currentBid: amount
                }
            }
        }));
    },

    myBids: async () => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.get("/user/mybiddings");
            return res.data;
        } catch (error) {
            console.error("Error fetching my bids:", error.response?.data?.message || error.message);
        } finally {
            set({ isLoading: false });
        }
    }
}));