import zod from 'zod';

// Defino el esquema para la validación de datos de una lucha
export const SchemaFight = zod.object({
    event_id: zod.number(),
    fighter_red_id: zod.number(),
    fighter_blue_id: zod.number(),
    fight_order: zod.number().optional(),
    is_title_fight: zod.boolean().optional(),
    is_main_event: zod.boolean().optional(),
    is_co_main_event: zod.boolean().optional(),
    weight_class: zod.string().optional(),
    winner_fighter: zod.enum(['red', 'blue', 'draw', 'no contest']).optional()
});

// Function para validar la data de la lucha
export function validateFight(data){
    return SchemaFight.safeParse(data);
}

// Function para actualizar la data de la pelea
export function validateUpdateFight(data){
    return SchemaFight.partial().safeParse(data);
}