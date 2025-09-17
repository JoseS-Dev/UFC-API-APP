import express, {json} from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import {RouteUser} from './routes/RouteAuth.mjs';
import {RoutesFighter} from './routes/RouteFighter.mjs';
import { RoutesStadistic } from './routes/RouteStadistic.mjs';

dotenv.config();

export const app = express();

app.use('/uploads/fighters', express.static('uploads/fighters'));

app.use(cors());
app.use(json());
app.use(morgan('dev'));

app.use('/api/auth', RouteUser);
app.use('/api/fighters', RoutesFighter);
app.use('/api/stadistics', RoutesStadistic);

// Montamos el servidor
app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${process.env.PORT}`);
})