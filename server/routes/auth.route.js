import {Router} from 'express';
import { login, register, logout, me, refresh, search } from '../controllers/auth.controller.js';    
import { verifyJWT } from '../middleware/auth.js';

const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/register', register); 
authRouter.post('/logout', logout);
authRouter.get('/refresh', refresh);
authRouter.get('/me', verifyJWT, me);   
authRouter.get('/search', verifyJWT, search);

export default authRouter;