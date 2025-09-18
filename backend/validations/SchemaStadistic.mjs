import zod from 'zod';

// Esquema de validación para las estadísticas de un luchador
export const SchemaStadistic = zod.object({
    streak_fighter: zod.string(),
    ranking_fighter: zod.number().optional(),
    precission_strike_fighter: zod.number().min(0).max(100),
    precission_takedown_fighter: zod.number().min(0).max(100),
    date_debut_fighter: zod.string().refine((date) => {
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime());
    }),
    last_fight_fighter: zod.string().refine((date) => {
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime());
    }),
    is_winning: zod.boolean().optional(),
    knockout_win_fighter: zod.number().min(0).optional(),
    submission_win_fighter: zod.number().min(0).optional(),
    decision_win_fighter: zod.number().min(0).optional(),
    title_wins_fighter: zod.number().min(0).optional(),
});

// Función para validar las estadísticas de un luchador
export function validateStadistic(data) {
    return SchemaStadistic.safeParse(data);
};

// Función para validar las estadisticas de un luchador, a la hora de actualizar
export function validateStadisticUpdate(data) {
    return SchemaStadistic.partial().safeParse(data);
}