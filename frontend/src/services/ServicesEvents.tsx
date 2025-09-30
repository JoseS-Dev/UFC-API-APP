// Servicios para manejar las operaciones relacionadas con los eventos

// Función para obtener todos los eventos
export async function getAllEvents(){
    try{
        const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/events/all`);
        if(!response?.ok) throw new Error('Error fetching events');
        const result = await response.json();
        return result;
    }
    catch(error){
        console.error('Error: ', error);
        throw error;
    }
}

// Función para obtener un evento por su ID
export async function getEventById(id: number){
    try{
        const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/events/event/${id}`);
        if(!response?.ok) throw new Error('Error fetching event by ID');
        const result = await response.json();
        return result;
    }
    catch(error){
        console.error('Error: ', error);
        throw error;
    }
}