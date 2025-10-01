import { create } from "zustand";
import type { LegendsContextType } from "../Interfaces/Legends";
import { getAllLegends, getLegendById } from "../services/ServicesLegends";

export const useLegendsStore = create<LegendsContextType>((set) => ({
    Legends: [],
    fetchAllLegends: async () => {
        const allLegends = await getAllLegends();
        set({ Legends: allLegends.data });
    },
    fetchLegendById: async (id: number) => {
        const legend = await getLegendById(id);
        return legend.data;
    }
}));
