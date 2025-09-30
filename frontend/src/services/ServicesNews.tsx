import { fetchWithToken } from "../auth"
// Servicio para obtener todas las noticias de la UFC
export async function getAllNews(){
    try{
        const response = await fetchWithToken(`${import.meta.env.VITE_APP_URL}/api/notices/all`);
        if(!response?.ok) throw new Error('Error fetching news');
        const result = await response.json();
        return result;
    }
    catch(error){
        console.error('Error:', error);
        throw error;
    }
}

// Servicio para obtener una noticia por su ID
export async function getNewsById(id: number){
    try{
        const response = await fetchWithToken(`${import.meta.env.VITE_APP_URL}/api/notices/notice/${id}`);
        if(!response?.ok) throw new Error('Error fetching news by ID');
        const result = await response.json();
        return result;
    }
    catch(error){
        console.error('Error:', error);
        throw error;
    }
}