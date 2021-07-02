import express, { Express } from 'express';
import cors from 'cors';
import { userRouter } from './routes/userRouter';
import { musicRouter } from './routes/musicRouter';
import { genreRouter } from './routes/genreRouter';
import { albumRouter } from './routes/albumRouter';

const app: Express = express();

app.use(express.json());
app.use(cors());

app.use('/users', userRouter);
app.use('/musics', musicRouter);
app.use('/genres', genreRouter);
app.use('/albums', albumRouter);

export { app };
