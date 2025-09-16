import { validateRegister, validateLogin } from "../validations/SchemaAuth.mjs";

export class ControllerUsers{
    constructor({ModelUser}){
        this.ModelUser = ModelUser;
    };

    // Controlador para el registro de un usuario
    registerUser = async (req, res) => {
        const validation = validateRegister(req.body);
        try{
            if(!validation.success) return res.status(400).json({error: validation.error.errors});
            const newUser = await this.ModelUser.registerUser({user: validation.data});
            if(newUser.error) return res.status(500).json({error: newUser.error});
            if(newUser.message) return res.status(400).json({message: newUser.message});
            return res.status(201).json({
                message: 'Usuario registrado con éxito',
                data: newUser
            });
        }
        catch(error){
            return res.status(500).json({error: 'Error en el servidor'});
        }
    }

    // Controlador para el login del usuario
    loginUser = async (req, res) => {
        const validation = validateLogin(req.body);
        try{
            if(!validation.success) return res.status(400).json({error: validation.error.errors});
            const LoggedUser = await this.ModelUser.loginUser({user: validation.data});
            if(LoggedUser.error) return res.status(500).json({error: LoggedUser.error});
            if(LoggedUser.message) return res.status(400).json({message: LoggedUser.message});
            return res.status(200).json({
                message: 'Usuario logueado con éxito',
                data: LoggedUser
            });
        }
        catch(error){
            return res.status(500).json({error: 'Error en el servidor'});
        }
    }

    // Controlador para el cierre de sesión del usuario
    logoutUser = async (req, res) => {
        const {email_user} = req.body;
        try{
            const loggedOutUser = await this.ModelUser.logoutUser({email_user});
            if(loggedOutUser.error) return res.status(500).json({error: loggedOutUser.error});
            if(loggedOutUser.message) return res.status(400).json({message: loggedOutUser.message});
            return res.status(200).json({message: loggedOutUser.out});
        }
        catch(error){
            return res.status(500).json({error: 'Error en el servidor'});
        }
    }

    // Controlador para verificar si el usuario esta autenticado
    verifyAuth = async (req, res) => {
        if(!req.user) return res.status(401).json({
            message: "Usuario no autenticado",
            isauthenticated: false
        })
        return res.status(200).json({message: "Usuario autenticado", isauthenticated: true })
    }
}