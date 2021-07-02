import express from 'express';
import { GenreController } from '../controller/GenreController';
import { ensureAccess } from '../services/ensureAccess';

const genreRouter = express.Router();

const genreController = new GenreController();

genreRouter.post('/', ensureAccess, genreController.create);

export { genreRouter };
