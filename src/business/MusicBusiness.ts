import { MusicDatabase } from '../data/MusicDatabase';
import { RelationshipMusicGenreDatabase } from '../data/RelationshipMusicGenreDatabase';
import { UserDatabase } from '../data/UserDatabase';
import { Music } from '../entities/Music';
import { BaseError } from '../error/BaseError';
import { ConflictError } from '../error/ConflictError';
import { InvalidFormatError } from '../error/InvalidFormatError';
import { MissingDependenciesError } from '../error/MissingDependenciesError';
import { NotFoundError } from '../error/NotFoundError';
import { Authenticator } from '../services/Authenticator';
import { IdGenerator } from '../services/IdGenerator';
import { musicInputDTO } from '../types/music';
import { RelationshipMusicGenreBusiness } from './RelationshipMusicGenreBusiness.';

export class MusicBusiness {
  public async create(input: musicInputDTO, token: string) {
    try {
      const { title, genresIds, albumId } = input;

      const hashManager = new Authenticator();
      const tokenData = hashManager.getData(token);

      if (!title || !albumId || !genresIds) {
        throw new MissingDependenciesError(
          'Missing dependencies: "title" or "genresIds" or "albumId"'
        );
      }

      if (!genresIds.length) {
        throw new InvalidFormatError(
          'Invalid genresIds format! expected an array of ids'
        );
      }

      const idGenerator = new IdGenerator();

      if (!idGenerator.isValid(albumId)) {
        throw new InvalidFormatError('albumId format invalid');
      }

      for (let [index, genreId] of genresIds.entries()) {
        if (!idGenerator.isValid(genreId)) {
          throw new InvalidFormatError(
            `genreId at position [${index}] is invalid format`
          );
        }
      }

      const id = idGenerator.generate();

      const userDatabase = new UserDatabase();
      const author = await userDatabase.getById(tokenData.id);

      if (!author) {
        throw new NotFoundError('User not found');
      }

      const musicForDatabase = new Music(id, title, author.getId(), albumId);

      const musicDatabase = new MusicDatabase();
      const music = await musicDatabase.create(musicForDatabase);

      if (!music) {
        throw new BaseError(
          'internal error registering music, please try again',
          500
        );
      }

      const relationshipMusicGenreBusiness =
        new RelationshipMusicGenreBusiness();
      const genres = await relationshipMusicGenreBusiness.create(
        genresIds,
        music.getId()
      );

      if (!genres) {
        throw new BaseError(
          'internal error registering relationship music genre, please try again',
          500
        );
      }

      return Music.toMusicObjectModel(music, genres);
    } catch (error) {
      if (
        error.message.includes('Duplicate') &&
        error.message.includes("key 'title'")
      ) {
        throw new ConflictError('Music already registered under this title');
      }
      throw new BaseError(error.sqlMessage || error.message, error.code || 500);
    }
  }

  public async getAll(token: string) {
    try {
      const hashManager = new Authenticator();
      const tokenData = hashManager.getData(token);

      const musicDatabase = new MusicDatabase();
      const musics = await musicDatabase.getAllByUserId(tokenData.id);

      const relationshipMusicGenreDatabase =
        new RelationshipMusicGenreDatabase();

      const musicsWithGenres = [];
      for (let music of musics) {
        const genres = await relationshipMusicGenreDatabase.getGenresByMusic(
          music.getId()
        );

        musicsWithGenres.push({ ...music, genres });
      }

      return musicsWithGenres;
    } catch (error) {
      throw new BaseError(error.sqlMessage || error.message, error.code || 500);
    }
  }
}
