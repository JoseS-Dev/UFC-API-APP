// Servicios para manejar las operaciones relacionadas con los luchadores

// Función para obtener a todos los luchadores
export async function getAllFighters(){
    try{
        const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/fighters/all`);
        if(!response?.ok) throw new Error('Error fetching fighters');
        const result = await response.json();
        return result;
    }
    catch(error){
        console.error('Error: ', error);
        throw error;
    }
}

// Función para obtener un luchador por su ID
export async function getFighterById(id: number){
    try{
        const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/fighters/fighter/${id}`);
        if(!response?.ok) throw new Error('Error fetching fighter by ID');
        const result = await response.json();
        return result;
    }
    catch(error){
        console.error('Error: ', error);
        throw error;
    }
}

// Función para obtener los luchadores favoritos de un usuario por su ID
export async function getFavoriteFightersByUser(user_id: number){
    try{
        const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/fighters/favorites/${user_id}`)
        if(!response?.ok) throw new Error('Error fetching favorite fighters by user ID');
        const result = await response.json();
        return result;
    }
    catch(error){
        console.error('Error: ', error);
        throw error;
    }
}