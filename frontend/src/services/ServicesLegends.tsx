// Servicios relacionados con las leyendas de la UFC

// Función para obtener todas las leyendas
export async function getAllLegends(){
    try{
        const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/legends/all`);
        if(!response.ok) throw new Error('Error fetching legends');
        const result = await response.json();
        return result;
    }
    catch(error){
        console.error('Error: ', error);
        throw error;
    }
}

// Función para obtener una leyenda por su ID
export async function getLegendById(id: number){
    try{
        const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/legends/legend/${id}`);
        if(!response.ok) throw new Error('Error fetching legend by ID');
        const result = await response.json();
        return result;
    }
    catch(error){
        console.error('Error: ', error);
        throw error;
    }
}