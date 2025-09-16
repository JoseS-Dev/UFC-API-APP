import supertest from 'supertest';
import { app } from '../app.mjs';

const request = supertest(app);