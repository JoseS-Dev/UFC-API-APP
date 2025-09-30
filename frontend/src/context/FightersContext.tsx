import {create} from 'zustand';
import type { FightersContextType } from '../Interfaces/Fighters';
import { getAllFighters, getFighterById, getFavoriteFightersByUser } from '../services/ServicesFighters';

// Contexto para manejar el estado de los luchadores
export const useFightersStore = create<FightersContextType>((set) => ({
    fighters: [],
    fightersFavoriteByUser: [],
    fetchAllFighters: async () => {
        const allFighters = await getAllFighters();
        set({ fighters: allFighters.data });
    },
    fetchFighterById: async (id: number) => {
        const fighter = await getFighterById(id);
        return fighter.data;
    },
    fetchFightersFavoritebyUserId: async (userId: number | undefined) => {
        if (userId) {
            const favoriteFighters = await getFavoriteFightersByUser(userId);
            set({ fightersFavoriteByUser: favoriteFighters.data });
        }
    }
}))