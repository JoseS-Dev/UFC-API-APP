import {db} from '../DB.mjs';
import pkg from 'lodash';

const { omit } = pkg;

export class ModelFighter{
    // Método para obtener a todos los luchadores
    static async getAllFighters(){
        const fighters = await db.query(
            `SELECT f.*, t.*, wc.*, ft.*, fwc.* FROM fighters f
            JOIN fighters_teams ft ON f.id = ft.fighter_id
            JOIN teams t ON ft.team_id = t.id
            JOIN fighters_weight_categories fwc ON f.id = fwc.fighter_id
            JOIN weight_categories wc ON fwc.category_id = wc.id`
        );
        if(fighters.rowCount === 0) return {message: 'No hay luchadores registrados'};
        console.log("Luchadores obtenidos con éxito");
        const fightersWithoutExtra = fighters.rows.map(fighter =>
            omit(fighter, ['is_blocked', 'created_at', 'updated_at', 
                'category_id', 'team_id', 'fighter_id'])
        );
        return {data: fightersWithoutExtra};
    }

    // Método para obtener a un luchador por su ID
    static async getFighterById({id}){
        if(!id) return {error: 'El ID del luchador no ha sido proporcionado'};
        // Primero obtengo los datos del luchador
        const fighter = await db.query(
            `SELECT * FROM fighters WHERE id = $1`,
            [id]
        );
        if(fighter.rowCount === 0) return {message: 'No existe un luchador con ese ID'};
        // Luego obtengo el equipo del luchador
        const team = await db.query(
            `SELECT t.*, ft.fighter_id FROM fighters_teams ft
            JOIN teams t ON ft.team_id = t.id
            WHERE ft.fighter_id = $1`,
            [id]
        );
        if(team.rowCount === 0) return {data: fighter.rows[0], message: 'El luchador no tiene equipo asignado'};
        // Luego obtengo la categoria de peso del luchador
        const category = await db.query(
            `SELECT wc.*, fc.fighter_id FROM fighters_weight_categories fc
            JOIN weight_categories wc ON fc.category_id = wc.id
            WHERE fc.fighter_id = $1`,
            [id]
        )
        if(category.rowCount === 0) return {data: {...fighter.rows[0], team_fighter: team.rows[0]}, message: 'El luchador no tiene categoria de peso asignada'};
        
        // Por ultimo obtengo las estadisticas del luchador
        const stadistics = await db.query(
            `SELECT * FROM stadistics_fighters WHERE fighter_id = $1`,
            [id]
        );
        if(stadistics.rowCount === 0) return {data: {...fighter.rows[0], team_fighter: team.rows[0], weight_category: category.rows[0]}, message: 'El luchador no tiene estadísticas asignadas'};
        
        console.log('Luchador obtenido con éxito');
        const fighterWithoutExtra = omit(fighter.rows[0], ['user_id', 'is_favorite', 'is_blocked', 'created_at', 'updated_at']);
        const teamWithoutExtra = omit(team.rows[0], ['fighter_id', 'id']);
        const categoryWithoutExtra = omit(category.rows[0], ['fighter_id', 'id']);
        const stadisticWithoutExtra = omit(stadistics.rows[0], ['id', 'fighter_id']);
        const DataFighter = {
            ...fighterWithoutExtra,
            team_fighter: teamWithoutExtra,
            weight_category: categoryWithoutExtra,
            stadistic: stadisticWithoutExtra
        }
        return {data: DataFighter};
    }

    // Método para obtener un luchador por su apodo
    static async getFighterByNickname({nickname_fighter}){
        if(!nickname_fighter) return {error: 'El apodo del luchador no ha sido proporcionado'};
        const fighter = await db.query(
            `SELECT * FROM fighters WHERE nickname_fighter = $1`,
            [nickname_fighter]
        );
        if(fighter.rowCount === 0) return {message: 'No existe un luchador con ese apodo'};
        console.log('Luchador obtenido con éxito');
        return {data: fighter.rows[0]};
    }

    // Método para obtener a los luchadores favoritos del usuario
    static async getFavoriteFightersByUser({user_id}){
        if(!user_id) return {error: 'El ID del usuario no ha sido proporcionado'};
        const favorites = await db.query(
            `SELECT f.* FROM fighters_users fu JOIN fighters f ON fu.fighter_id = f.id
            WHERE fu.is_favorite = true AND fu.user_id = $1`,
            [user_id]
        );
        if(favorites.rowCount === 0) return {message: 'El usuario no tiene luchadores favoritos'};
        const fightersWithoutExtra = favorites.rows.map(fighter => 
            omit(fighter, ['is_blocked', 'created_at', 'updated_at'])
        );
        return { data: fightersWithoutExtra };
    }

    // Método para obtener a los luchadores bloqueados
    static async getBlockedFighters(){
        const blockFighters = await db.query(
            `SELECT * FROM fighters WHERE is_blocked = true`
        );
        if(blockFighters.rowCount === 0) return {message: 'No hay luchadores bloqueados'};
        console.log('Luchadores bloqueados obtenidos con éxito');
        return {data: blockFighters.rows};
    }

    // Método para crear un nuevo luchador
    static async createFighter({fighter}){
        if(!fighter) return {error: 'Los datos del luchador no han sido proporcionados'};
        const {
            name_fighter, nickname_fighter, age_fighter, weight_fighter,
            height_fighter, stance_fighter, country_fighter, image_fighter,
            team_id, category_id
        } = fighter;
        // Verficamos si ya existe el luchador
        const existingFighter = await db.query(
            `SELECT * FROM fighters WHERE nickname_fighter = $1`,
            [nickname_fighter]
        );
        if(existingFighter.rowCount > 0) return {message: 'Ya existe un luchador con ese apodo'};
        // Si el luchador no existe, Insertamos al nuevo luchador
        const newFighter = await db.query(
            `INSERT INTO fighters(name_fighter, nickname_fighter, age_fighter, weight_fighter,
            height_fighter, stance_fighter, country_fighter, image_fighter)
            VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
            [name_fighter, nickname_fighter, age_fighter, weight_fighter,
            height_fighter, stance_fighter, country_fighter, image_fighter
            ]
        );
        if(newFighter.rowCount === 0) return {error: 'No se ha podido registrar el luchador'};
        // Ahora, si se proporciona un team_id, se inserta en la tabla intermedia fighters_teams
        if(team_id){
            await db.query(
                `INSERT INTO fighters_teams (fighter_id, team_id) VALUES($1, $2)`,
                [newFighter.rows[0].id, team_id]
            );
        }
        // Ahora, si se proporciona un category_id, se inserta en la tabla intermedia fighters_weight_categories
        if(category_id){
            await db.query(
                `INSERT INTO fighters_weight_categories (fighter_id, category_id) VALUES($1, $2)`,
                [newFighter.rows[0].id, category_id]
            );
        }
        // Finalmente, retornamos los datos del nuevo luchador
        console.log('Luchador registrado con éxito');
        const fighterWithoutExtra = omit(newFighter.rows[0], ['user_id', 'is_favorite', 'is_blocked', 'created_at', 'updated_at']);
        return {data: fighterWithoutExtra};
    }

    // Método para actualizar los datos de un luchador
    static async updateFighter({id, fighter}){
        if(!id) return {error: 'El ID del luchador no ha sido proporcionado'};
        if(!fighter) return {error: 'Los datos del luchador no han sido proporcionados'};
        const allowFields = [
            'name_fighter', 'nickname_fighter', 'age_fighter', 'weight_fighter',
            'height_fighter', 'stance_fighter', 'country_fighter', 'image_fighter',
        ];
        // Se filtran los campos que se van a actualizar
        const fieldsUpdate = {};
        for(const key in fighter){
            if(allowFields.includes(key)){
                fieldsUpdate[key] = fighter[key];
            }
        };
        // Se verifica si el luchador existe
        const existingFighter = await db.query(
            `SELECT * FROM fighters WHERE id = $1`,
            [id]
        );
        if(existingFighter.rowCount === 0) return {message: 'No existe un luchador con ese ID'};
        // Si el luchador existe, se actualizan los campos permitidos
        const setFields = [];
        const values = [];

        Object.entries(fieldsUpdate).forEach(([key, value], index) => {
            setFields.push(`${key} = $${index + 1}`);
            values.push(value);
        });
        values.push(id); // Agrego el ID al final de los valores
        // A continuación, se actualiza el luchador en la base de datos
        if(setFields.length > 0){
            const updatedFighter = await db.query(
                `UPDATE fighters SET ${setFields.join(', ')} WHERE id = $${values.length}`,
                values
            );
            if(updatedFighter.rowCount === 0) return {error: 'No se ha podido actualizar el luchador'};
            // Si se proporciona un team_id, se actualiza o inserta en la tabla intermedia fighters_teams
            if(fighter.team_id !== undefined){
                const existingRelation = await db.query(
                    `SELECT * FROM fighters_teams WHERE fighter_id = $1`,
                    [id]
                );
                if(existingRelation.rowCount > 0){
                    // Actualizo la relación existente
                    await db.query(
                        `UPDATE fighters_teams SET team_id = $1 WHERE fighter_id = $2`,
                        [fighter.team_id, id]
                    );
                }
            }else{
                // Se inserta una nueva relación
                await db.query(
                    `INSERT INTO fighters_teams (fighter_id, team_id) VALUES($1, $2)`,
                    [id, fighter.team_id]
                );
            }
            // Si se proporciona un category_id, se actualiza o inserta en la tabla intermedia fighters_weight_categories
            if(fighter.category_id !== undefined){
                const existingCategoryRelation = await db.query(
                    `SELECT * FROM fighters_weight_categories WHERE fighter_id = $1`,
                    [id]
                );
                if(existingCategoryRelation.rowCount > 0){
                    // Actualizo la relación existente
                    await db.query(
                        `UPDATE fighters_weight_categories SET category_id = $1 WHERE fighter_id = $2`,
                        [fighter.category_id, id]
                    );
                }else{
                    // Si no existe la relación, la creo
                    await db.query(
                        `INSERT INTO fighters_weight_categories (fighter_id, category_id) VALUES($1, $2)`,
                        [id, fighter.category_id]
                    );
                }
            }
            console.log('Luchador actualizado con éxito');
            return {data: updatedFighter.rows[0]};
        }
    }

    // Método para eliminar un luchador
    static async deleteFighter({id}){
        if(!id) return {error: 'El ID del luchador no ha sido proporcionado'};
        // Primero se verifica si el luchador existe
        const existingFighter = await db.query(
            `SELECT * FROM fighters WHERE id = $1`,
            [id]
        );
        if(existingFighter.rowCount === 0) return {message: 'No existe un luchador con ese ID'};
        // Si el luchador existe, se elimina de la base de datos
        const deletedFighter = await db.query(
            `DELETE FROM fighters WHERE id = $1`,
            [id]
        );
        if(deletedFighter.rowCount > 0){
            // Elimino las relaciones en la tabla intermedia 
            await db.query(`DELETE FROM fighters_teams WHERE fighter_id = $1`, [id]);
            await db.query(`DELETE FROM fighters_weight_categories WHERE fighter_id = $1`, [id]);
            await db.query(`DELETE FROM fighters_users WHERE fighter_id = $1`, [id]);
            console.log('Luchador eliminado con éxito');
            return {message: 'Luchador eliminado con éxito'};
        }
        return {error: 'No se ha podido eliminar el luchador'};
    };

    // Método para marcar o desmarcar un luchador como favorito de un usuario
    static async toggleFavoriteFighter({user_id, fighter_id, is_favorite}){
        if(!user_id) return {error: 'El ID del usuario no ha sido proporcionado'};
        if(!fighter_id) return {error: 'El ID del luchador no ha sido proporcionado'};
        if(is_favorite === undefined || is_favorite === null) return {error: 'El estado de favorito no ha sido proporcionado'};
        // Primero verificamos que el usuario y el luchador existan
        const existingUser = await db.query(
            `SELECT * FROM users WHERE id = $1`,
            [user_id]
        );
        const existingFighter = await db.query(
            `SELECT * FROM fighters WHERE id = $1`,
            [fighter_id]
        );
        if(existingUser.rowCount === 0 || existingFighter.rowCount === 0) return {exists: 'El usuario o el luchador no existen'};
        // Inserto o actualizo la relación en la tabla intermedia fighters_users
        const existingRelational = await db.query(
            `SELECT * FROM fighters_users WHERE user_id = $1 AND fighter_id = $2`,
            [user_id, fighter_id]
        );
        if(existingRelational.rowCount > 0){
            // Se actauliza la relación existente
            await db.query(
                `UPDATE fighters_users SET is_favorite = $1 WHERE user_id = $2 AND fighter_id = $3`,
                [is_favorite, user_id, fighter_id]
            );
            console.log('Estado de favorito actualizado con éxito');
            return {message: is_favorite ? 'Luchador marcado como favorito con éxito' : 'Luchador desmarcado como favorito con éxito'};
        }
        else{
            // Inserto una nueva relación
            await db.query(
                `INSERT INTO fighters_users (user_id, fighter_id, is_favorite) VALUES($1, $2, $3)`,
                [user_id, fighter_id, is_favorite]
            );
            console.log('Luchador marcado como favorito con éxito');
            return {message: 'Luchador marcado como favorito con éxito'};
        }
    }

    // Método para bloquear o desbloquear un luchador (solo admin)
    static async toggleBlockedFighter({id, is_blocked}){
        if(!id) return {error: 'El ID del luchador no ha sido proporcionado'};
        if(is_blocked === undefined || is_blocked === null) return {error: 'El estado de bloqueado no ha sido proporcionado'};
        // Primero verificamos que el luchador exista
        const existingFighter = await db.query(
            `SELECT * FROM fighters WHERE id = $1`,
            [id]
        );
        if(existingFighter.rowCount === 0) return {message: 'No existe un luchador con ese ID'};
        // Si el luchador existe, se actualiza su estado de bloqueado
        const updatedFighter = await db.query(
            `UPDATE fighters SET is_blocked = $1 WHERE id = $2 RETURNING *`,
            [is_blocked, id]
        );
        if(updatedFighter.rowCount === 0) return {error: 'No se ha podido actualizar el estado de bloqueado del luchador'};
        console.log('Estado de bloqueado actualizado con éxito');
        const fighterWithoutExtra = omit(updatedFighter.rows[0], ['created_at', 'updated_at']);
        return { data: fighterWithoutExtra };
    }
}