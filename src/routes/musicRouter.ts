import express from 'express';
import { MusicController } from '../controller/MusicController';

const musicRouter = express.Router();

const userController = new MusicController();

musicRouter.post('/', userController.create);

export { musicRouter };
