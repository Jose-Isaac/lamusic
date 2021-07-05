import express from 'express';
import { MusicController } from '../controller/MusicController';
import { ensureAccess } from '../services/ensureAccess';

const musicRouter = express.Router();

const userController = new MusicController();

musicRouter.post('/', ensureAccess, userController.create);
musicRouter.get('/', ensureAccess, userController.getAll);
musicRouter.get('/:id', ensureAccess, userController.getById);

export { musicRouter };
