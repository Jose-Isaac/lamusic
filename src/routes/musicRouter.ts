import express from 'express';
import { MusicController } from '../controller/MusicController';
import { ensureAccess } from '../services/ensureAccess';

const musicRouter = express.Router();

const userController = new MusicController();

musicRouter.post('/', ensureAccess, userController.create);

export { musicRouter };
