import zod from 'zod';


// Defino un esquema para las leyendas de la UFC
export const SchemaLegends = zod.object({
    name_legend: zod.string().min(3),
    nickname_legend: zod.string().min(3),
    image_legend: zod.string().url(),
    weight_legend: zod.number(),
    height_legend: zod.number(),
    stance_legend: zod.string().refine((val) => ['orthodox', 'southpaw', 'switch'].includes(val)),
    country_legend: zod.string().min(3),
    streak_legend: zod.string(),
    title_win_legend: zod.number().min(0),
    trophys_legend: zod.number().min(0),
    description_legend: zod.string().min(10),
    date_debut_legend: zod.string().refine((val) =>{
        const parsedDate = new Date(val);
        return !isNaN(parsedDate.getTime());
    }),
    date_retirement_legend: zod.string().refine((val) => {
        const parsedDate = new Date(val);
        return !isNaN(parsedDate.getTime());
    }),
    period_active_legend: zod.string().min(3)
});

// Función para validar los datos de la leyenda
export function validateLegendData(legendData){
    return SchemaLegends.safeParse(legendData);
}

// Function para validar datos de actualización de leyenda
export function validateLegendUpdateData(legendData){
    return SchemaLegends.partial().safeParse(legendData);
}