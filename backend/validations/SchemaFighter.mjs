import zod from 'zod';
import {validStances} from '../utils.mjs';

// Defino un esquema de validación para un luchador
export const schemaFighter = zod.object({
    name_fighter: zod.string().min(3),
    nickname_fighter: zod.string().min(3),
    age_fighter: zod.number().min(18),
    weight_fighter: zod.number(),
    height_fighter: zod.number(),
    stance_fighter: zod.string().refine((val)=>{return validStances.includes(val)}),
    country_fighter: zod.string().min(3),
    image_fighter: zod.string().url().optional(),
    team_id: zod.number().int().optional(),
    category_id: zod.number().int().optional()
});

// Función para validar un luchador usando el esquema definido
export function validateFighter(fighter) {
    return schemaFighter.safeParse(fighter);
}

// Función para validar los datos cuando se actualiza un luchador
export function validateFighterUpdate(fighter){
    return schemaFighter.partial().safeParse(fighter);
}
