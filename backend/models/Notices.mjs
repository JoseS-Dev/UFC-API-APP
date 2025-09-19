import {db} from '../DB.mjs';

export class ModelNotice{
    // Método para obtener todas las noticias
    static async getAllNotices(){
        const notices = await db.query(`SELECT * FROM notices`);
        if(notices.rowCount === 0) return {message: 'No hay noticias disponibles'};
        return {data: notices.rows};
    }
    // Método para obtener una noticia por su ID
    static async getNoticeById({id}){
        if(!id) return {error: 'Nof ue el ID propocionado'}
        const notice = await db.query(`SELECT * FROM notices WHERE id = $1`, [id]);
        if(notice.rowCount === 0) return {message: `No existe la noticia con el ID ${id}`};
        return {data: notice.rows[0]};
    }

    // Método para crear una noticia (solo admin)
    static async createNotice({notice}){
        if(!notice) return {error: 'No fue propocionada la data de la noticia'}
        const { title_notice, content_notice, image_notice, video_notice } = notice;
        // Se verifica si ya existe la noticia
        const existingNotice = await db.query(
            `SELECT * FROM notices WHERE title_notice = $1`,
            [title_notice]
        );
        if(existingNotice.rowCount > 0) return {message: `Ya existe una noticia con el título ${title_notice}`};
        // Se inserta la nueva noticia
        const newNotice = await db.query(
            `INSERT INTO notices (title_notice, content_notice, image_notice, video_notice)
            VALUES($1,$2,$3,$4) RETURNING *`,
            [title_notice, content_notice, image_notice, video_notice]
        );
        if(newNotice.rowCount === 0) return {error: 'No se pudo crear la noticia'};
        return {data: newNotice.rows[0]};
    }

    // Método para actualizar una noticia (solo admin)
    static async updateNotice({id, notice}){
        if(!id || !notice) return {error: 'No fue propocionado el ID o la data de la noticia'};
        const allowedFields = [
            'title_notice', 'content_notice', 'image_notice', 'video_notice'
        ];
        const fieldsToUpdate = {};
        for(const field of allowedFields){
            if(allowedFields.includes(field)){
                fieldsToUpdate[field] = notice[field];
            }
        }

        // Se verifica si existe la noticia 
        const existingNotice = await db.query(
            `SELECT * FROM notices WHERE id = $1`,
            [id]
        );
        if(existingNotice.rowCount === 0) return {error: `No existe la noticia con el ID ${id}`};
        // si existe, se procede a actualizar
        const setFields = [];
        const values = [];

        Object.entries(fieldsToUpdate).forEach(([key, value], index) => {
            setFields.push(`${key} = $${index + 1}`);
            values.push(value);
        });
        values.push(id); // Agrego el ID al final de los valores
        const updatedNotice = await db.query(
            `UPDATE notices SET ${setFields.join(', ')} WHERE id = $${values.length}`,
            values
        );
        if(updatedNotice.rowCount === 0) return {error: 'No se pudo actualizar la noticia'};
        return {message: `La noticia ${existingNotice.rows[0].title_notice} fue actualizada correctamente`};
    }

    // Método para eliminar una noticia (solo admin)
    static async deleteNotice({id}){
        if(!id) return {error: 'No fue propocionado el ID de la noticia'};
        // Se verifica si existe la noticia
        const existingNotice = await db.query(
            `SELECT * FROM notices WHERE id = $1`,
            [id]
        );
        if(existingNotice.rowCount === 0) return {error: `No existe la noticia con el ID ${id}`};
        // Si existe, se procede a eliminar
        const deletedNotice = await db.query(
            `DELETE FROM notices WHERE id = $1`,
            [id]
        );
        if(deletedNotice.rowCount === 0) return {error: 'No se pudo eliminar la noticia'};
        return {message: `La noticia ${existingNotice.rows[0].title_notice} fue eliminada correctamente`};
    }
}