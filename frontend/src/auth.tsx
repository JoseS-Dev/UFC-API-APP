// Function para obtener el token del usuario desde el localStorage
export function getToken(){
    return localStorage.getItem('token');
}

// Function para modificar el fetch y agregar el token en los headers
export function fetchWithToken(url: string, options: RequestInit = {}){
    const token = getToken();
    if(token){
        options.headers = {
            ...options.headers,
            'authorization': `Bearer ${token}`
        };
        return fetch(url, options);
    }
}

