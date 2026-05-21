import {Router} from 'express';
import {createTrip,deleteTrip,addMember,deleteMember} from './../controllers/trip.controller.js';

const tripRouter = Router();

tripRouter.post('/createTrip',createTrip);
tripRouter.post('/deleteTrip',deleteTrip);
tripRouter.post('/addMember',addMember);
tripRouter.post('/deleteMember',deleteMember);

export default tripRouter;