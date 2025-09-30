import {create} from 'zustand';
import type { EventsContextType } from '../Interfaces/events';
import { getAllEvents, getEventById } from '../services/ServicesEvents';

// Contexto para manejar el estado de los eventos
export const useEventsStore = create<EventsContextType>((set) => ({
    events: [],
    fetchAllEvents: async () => {
        const allEvents = await getAllEvents();
        set({ events: allEvents.data });
    },
    fetchEventById: async (id: number) => {
        const event = await getEventById(id);
        return event.data;
    }
}));