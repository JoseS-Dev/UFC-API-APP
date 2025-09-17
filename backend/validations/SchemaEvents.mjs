import zod from 'zod';

// Esquema de validación para los eventos
export const SchemaEvents = zod.object({
    name_event: zod.string().min(3),
    location_event: zod.string().min(3),
    venue_event: zod.string().min(3),
    date_event: zod.string().refine((date) =>{
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime());
    }),
    country_event: zod.string().min(3).optional(),
    image_event: zod.string().url().optional()
});

// Función para validar los eventos
export function validateEvents(data){
    return SchemaEvents.safeParse(data);
}