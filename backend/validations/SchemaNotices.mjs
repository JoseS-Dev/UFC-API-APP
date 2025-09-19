import zod from 'zod';

// Defino un esquema para la data de las noticias
export const SchemaNotices = zod.object({
    title_notice: zod.string().min(3),
    content_notice: zod.string().min(10),
    image_notice: zod.string().optional().nullable(),
    video_notice: zod.string().optional().nullable(),
});

// Function qeu validan los datos de una noticia
export function validateNoticeData(data){
    return SchemaNotices.safeParse(data)
};

// Function que valida los datos de una noticia , a la hora de actualizar
export function validateUpdateNoticeData(data){
    return SchemaNotices.partial().safeParse(data)
}