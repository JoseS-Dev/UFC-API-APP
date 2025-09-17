import {db} from '../DB.mjs';
import pkg from 'lodash';

const {omit} = pkg;

export class ModelFighter{
    // Método para obtener estadisticas de un luchador por su ID
    static async getStadisticByFighter({fighter_id}){
        if(!fighter_id) return {error: 'El ID del luchador es obligatorio'};
        // Se verifica si el luchador existe
        const fighterExists = await db.query(
            `SELECT * FROM fighters WHERE id = $1`, [fighter_id]
        );
        if(fighterExists.rows.length === 0) return {message: 'El luchador no existe'};
        // Se obtienen las estadisticas del luchador
        const stadistic = await db.query(
            `SELECT * FROM fighters_stadistics WHERE fighter_id = $1`,
            [fighter_id]
        );
        if(stadistic.rows.length === 0) return {message: 'El luchador no tiene estadísticas'};
        // Ignoramos algunos campos
        const fighterWithoutExtra = omit(fighterExists.rows[0], ['created_at', 'updated_at', 'is_blocked']);
        const stadisticWithoutExtra = omit(stadistic.rows[0], ['id', 'fighter_id']);
        return { 
            data: {
                ...fighterWithoutExtra,
                stadistic: stadisticWithoutExtra
            }
        }
    }
    // método para obtener las estadisticas de un luchador por el ranking en la UFC
    static async getStadisticByRanking({ranking_fighter}){
        if(!ranking_fighter) return {error: 'El ranking del luchador es obligatorio'};
        const stadistic = await db.query(
            `SELECT fs.*, f.* FROM fighters_stadistics fs
            JOIN fighters f ON fs.fighter_id = f.id
            WHERE fs.ranking_fighter = $1`,
            [ranking_fighter]
        );
        if(stadistic.rows.length === 0) return {message: 'No se encontraron estadísticas para el ranking proporcionado'};
        return {data: stadistic.rows}
    }

    // método para crear las estatdisticas de un luchador
    static async createStadistic({fighter_id, stadistic}){
        if(!fighter_id || !stadistic) return {error: 'El ID del luchador y las estadísticas son obligatorios'};
        const {
            streak_fighter, ranking_fighter, precission_strike_fighter, precission_takedown_fighter,
            date_debut_fighter, last_fight_fighter, knockout_wins_fighter, submission_wins_fighter,
            decision_wins_fighter, title_wins_fighter
        } = stadistic;
        // Se verifica si el luchador existe
        const existingFighter = await db.query(
            `SELECT * FROM fighters WHERE id = $1`, [fighter_id]
        );
        if(existingFighter.rowCount > 0){
            // Si el luchador existe, se crean las estadísticas
            const newStatistic = await db.query(
                `INSERT INTO fighters_stadistics
                (fighter_id, streak_fighter, ranking_fighter, precission_strike_fighter, precission_takedown_fighter,
                date_debut_fighter, last_fight_fighter, knockout_wins_fighter, submission_wins_fighter,
                decision_wins_fighter, title_wins_fighter)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                RETURNING *`,
                [fighter_id, streak_fighter, ranking_fighter, precission_strike_fighter, precission_takedown_fighter,
                date_debut_fighter, last_fight_fighter, knockout_wins_fighter, submission_wins_fighter,
                decision_wins_fighter, title_wins_fighter]
            );
            if(newStatistic.rowCount === 0) return {error: 'Error al crear las estadísticas del luchador'};
            const stadisticWithoutExtra = omit(newStatistic.rows[0], ['id']);
            return {data: stadisticWithoutExtra};
        }
        return {message: 'El luchador no existe'};
    }

    // método para actualizar las estadisticas de un luchador
    static async updateStadistic({fighter_id, stadistic}){
        if(!fighter_id || !stadistic) return {error: 'El ID del luchador y las estadísticas son obligatorios'};
        const allowedFields = [
            'streak_fighter', 'ranking_fighter', 'precission_strike_fighter',
            'precission_takedown_fighter', 'date_debut_fighter', 'last_fighter_fighter',
            'date_debut_fighter', 'knockout_wins_fighter', 'submission_wins_fighter',
            'decision_wins_fighter', 'title_wins_fighter'
        ];

        const fieldsUpdate = {};
        for(const key in stadistic){
            if(allowedFields.includes(key)){
                fieldsUpdate[key] = stadistic[key];
            }
        }

        // Se verifica si existe el luchador y sus estadisticas
        const existingFighter = await db.query(
            `SELECT * FROM fighters WHERE id = $1`, [fighter_id]
        );
        const existingStadistic = await db.query(
            `SELECT * FROM fighters_stadistics WHERE fighter_id = $1`, [fighter_id]
        );
        if(existingFighter.rowCount > 0 && existingStadistic.rowCount > 0){
            // si el luchador y sus estadisticas existen, se procede a actaulizarlas
            const setFields = [];
            const values = [];

            Object.entries(fieldsUpdate).forEach(([key, value], index) => {
                setFields.push(`${key} = $${index + 1}`);
                values.push(value);
            })
            values.push(fighter_id);
            const updatedstadistic = await db.query(
                `UPDATE fighters_stadistics SET ${setFields.join(', ')} WHERE fighter_id = $${values.length} `
            )
            if(updatedstadistic.rowCount === 0) return {error: 'Error al actualizar las estadísticas del luchador'};
            return {message: `Estadísticas actualizadas correctamente ${existingFighter.rows[0].name_fighter}`};
        }
        return {error: 'El luchador o sus estadísticas no existen'};
    }

    // método para eliminar las estadisticas de un luchador
    static async deleteStadistic({fighter_id}){
        if(!fighter_id) return {error: 'El ID del luchador es obligatorio'};
        // Se verifica si existe el luchador y sus estadisticas
        const existingFighter = await db.query(`SELECT * FROM fighters WHERE id = $1`, [fighter_id]);
        const existingStadistic = await db.query(`SELECT * FROM fighters_stadistics WHERE fighter_id = $1`, [fighter_id]);
        if(existingFighter.rowCount > 0 && existingStadistic.rowCount > 0){
            // Si el luchador y sus estadisticas existen, se procede a eliminarlas
            const deletedstadistic = await db.query(
                `DELETE FROM fighters_stadistics WHERE fighter_id = $1`, 
                [fighter_id]
            );
            if(deletedstadistic.rowCount === 0) return {error: 'Error al eliminar las estadísticas del luchador'};
            return {message: `Estadísticas eliminadas correctamente de ${existingFighter.rows[0].name_fighter}`};
        }
        return {error: 'El luchador o sus estadísticas no existen'};
    }
}