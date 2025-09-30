export interface EventData {
    id: number;
    name_event: string;
    location_event: string;
    image_event: string;
    date_event: string;
    venue_event: string;
}

export interface EventsContextType {
    events: EventData[];
    fetchAllEvents: () => Promise<void>;
    fetchEventById: (id: number) => Promise<EventData>;
}