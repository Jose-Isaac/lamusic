import express from 'express';
import { AlbumController } from '../controller/AlbumController';
import { ensureAccess } from '../services/ensureAccess';

const albumRouter = express.Router();

const albumController = new AlbumController();

albumRouter.post('/', ensureAccess, albumController.create);

export { albumRouter };
