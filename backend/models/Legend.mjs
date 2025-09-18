import {db} from '../DB.mjs';
import pkg from 'lodash';

const { omit } = pkg;

export class ModelLegend {
    // método para obtener todas las leyendas
    static async getAllLegends(){
        const legends = await db.query('SELECT * FROM legends_fighters');
        if(legends.rowCount === 0) return {message: 'No hay leyendas registradas'};
        return {data: legends.rows};
    }

    // Método para obtener una leyenda por su ID
    static async getLegendById({id}){
        if(!id) return {error: 'ID de leyenda es requerido'};
        const legend = await db.query(`SELECT * FROM legends_fighters WHERE id = $1`, [id]);
        if(legend.rowCount === 0) return {message: 'Leyenda no encontrada'};
        return {data: legend.rows[0]};
    }

    // Método para obtener a todas las leyendas favoritas de un usuario
    static async getFavoriteLegendsByUser({user_id}){
        if(!user_id) return {error: 'ID de usuario es requerido'};
        const legends = await db.query(
            `SELECT lf.* FROM legends_users lu JOIN legends_fighters lf
            ON lu.legend_id = lf.id WHERE lu.user_id = $1 AND lu.is_favorite = true
            `,
            [user_id]
        );
        if(legends.rowCount === 0) return {message: 'No hay leyendas favoritas para este usuario'};
        const LegendData = legends.rows.map(legend => omit(legend, ['user_id']));
        return {data: LegendData};
    }

    // Método para obtener a todas las leyendas de un pais
    static async getLegendsByCountry({country_legend}){
        if(!country_legend) return {error: 'Pais de leyenda es requerido'};
        const legends = await db.query(
            `SELECT * FROM legends_fighters WHERE country_legend = $1`,
            [country_legend]
        );
        if(legends.rowCount === 0) return {message: 'No hay leyendas para este pais'};
        return {data: legends.rows};
    }

    // método para marcar o desmarcar una leyenda como favorito para un usuario
    static async toggleFavoriteLegend({user_id, legend_id, is_favorite}){
        if(!user_id || !legend_id) return {error: 'ID de usuario y leyenda son requeridos'};
        if(is_favorite === undefined || is_favorite === null) return {error: 'El estado de favorito es requerido'};
        // Se verifica si el usuario existe
        const existingUser = await db.query('SELECT * FROM users WHERE id = $1', [user_id]);
        // Se verifica si la leyenda existe
        const existingLegend = await db.query('SELECT * FROM legends_fighters WHERE id = $1', [legend_id]);
        if(existingUser.rowCount === 0 || existingLegend.rowCount === 0) return {error: 'Usuario o leyenda no encontrados'};
        // si existe, se actualiza o inserta el registro en la tabla intermedia
        const existingRelational = await db.query(
            `SELECT * FROM legends_users WHERE user_id = $1 AND legend_id = $2`,
            [user_id, legend_id]
        );
        if(existingRelational.rowCount > 0){
            // Actualizar el registro existente
            await db.query(
                `UPDATE legends_users SET is_favorite = $1 WHERE user_id = $2 AND legend_id = $3`,
                [is_favorite, user_id, legend_id]
            );
            console.log("Leyenda favorita actualizada con exito");
            return {message: is_favorite ? 'Leyenda marcada como favorita' : 'Leyenda desmarcada como favorita'};
        }
        // Insertamos la nueva relación
        await db.query(
            `INSERT INTO legends_users (user_id, legend_id, is_favorite) VALUES ($1, $2, $3)`,
            [user_id, legend_id, is_favorite]
        );
        return {message: 'Leyenda marcada como favorita'};
    }

    // Método para crear una nueva leyenda
    static async createlegend({legend}){
        if(!legend) return {error: 'Datos de leyenda son requeridos'};
        const { 
            name_legend, nickname_legend, image_legend, weight_legend,
            height_legend, stance_legend, country_legend, streak_Legend,
            title_win_legend, trophys_legend, description_legend, date_debut_legend,
            date_retirement_legend, period_active_legend
        } = legend;
        // Se verifica si ya existe la leyenda
        const existingLegend = await db.query(
            `SELECT * FROM legends_fighters WHERE nickname_legend = $1`,
            [nickname_legend]
        );
        if(existingLegend.rowCount > 0) return {error: 'La leyenda ya existe'};
        // Si no existe, se inserta en la base de datos
        const newLegend = await db.query(
            `INSERT INTO legends_fighters(name_legend, nickname_legend, image_legend,
            weight_legend, height_legend, stance_legend, country_legend, streak_legend,
            title_win_legend, trophys_legend, description_legend, date_debut_legend,
            date_retirement_legend, period_active_legend) VALUES ($1, $2, $3, $4, 
            $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`,
            [
                name_legend, nickname_legend, image_legend, weight_legend,
                height_legend, stance_legend, country_legend, streak_Legend,
                title_win_legend, trophys_legend, description_legend, date_debut_legend,
                date_retirement_legend, period_active_legend
            ]
        )
        if(newLegend.rowCount === 0) return {error: 'Error al crear la leyenda'};
        return {data: newLegend.rows[0]};
    }

    // Método para actualizar una leyenda existente
    static async updateLegend({id, legend}){
        if(!id || !legend) return {error: 'ID y datos de leyenda son requeridos'};
        const allowedFields = [
            'name_legend', 'nickname_legend', 'image_legend', 'weight_legend',
            'height_legend', 'stance_legend', 'country_legend', 'streak_legend',
            'title_win_legend', 'trophys_legend', 'description_legend', 'date_debut_legend',
            'date_retirement_legend', 'period_active_legend'
        ];
        
        const fieldsToUpdate = {};
        for(const field of allowedFields){
            if(allowedFields.includes(field)){
                fieldsToUpdate[field] = legend[field];
            }
        }

        // Se verifica si existe la leyenda
        const existingLegend = await db.query(
            `SELECT * FROM legends_fighters WHERE id = $1`,
            [id]
        );
        if(existingLegend.rowCount === 0) return {error: 'La leyenda no existe'};
        // Si existe, se procede a actualizar
        const setField = [];
        const values = [];

        Object.entries(fieldsToUpdate).forEach(([key, value], index) => {
            setField.push(`${key} = $${index + 1}`);
            values.push(value);
        });
        values.push(id); // Agrego el ID al final para la cláusula WHERE
        const uploadedLegend = await db.query(
            `UPDATE legends_fighters SET ${setField.join(', ')} WHERE id = $${values.length}`,
            values
        );
        if(uploadedLegend.rowCount === 0) return {error: 'Error al actualizar la leyenda'};
        
        return { message: `La leyenda ${existingLegend.rows[0].name_legend} ha sido actualizada` };
    }

    // método para eliminar una leyenda
    static async deleteLegend({id}){
        if(!id) return {error: 'ID de leyenda es requerido'};
        // Se verifica si existe la leyenda
        const existingLegend = await db.query(
            `SELECT * FROM legends_fighters WHERE id = $1`,
            [id]
        );
        if(existingLegend.rowCount === 0) return {error: 'La leyenda no existe'};
        // Si existe, se procede a eliminar
        const deletedLegend = await db.query(
            `DELETE FROM legends_fighters WHERE id = $1`,
            [id]
        );
        if(deletedLegend.rowCount === 0) return {error: 'Error al eliminar la leyenda'};
        return { message: `La leyenda ${existingLegend.rows[0].name_legend} ha sido eliminada` };
    }
}