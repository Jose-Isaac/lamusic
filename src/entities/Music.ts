import { Genre } from './Genre';

export class Music {
  constructor(
    private readonly id: string,
    private title: string,
    private author_id: string,
    private album_id: string,
    private created_at?: Date,
    private updated_at?: Date
  ) {}

  public getId(): string {
    return this.id;
  }
  public getTitle(): string {
    return this.title;
  }
  public getAuthorId(): string {
    return this.author_id;
  }
  public getCreatedAt(): Date | undefined {
    return this.created_at;
  }
  public getUpdatedAt(): Date | undefined {
    return this.updated_at;
  }
  public getAlbumId(): string {
    return this.album_id;
  }

  public setTitle(title: string): void {
    this.title = title;
  }

  public static toMusicObjectModel(music: Music, genres: Genre[]) {
    return {
      id: music.getId(),
      title: music.getTitle(),
      author_id: music.getAuthorId(),
      album_id: music.getAlbumId(),
      created_at: music.getCreatedAt(),
      updated_at: music.getUpdatedAt(),
      genres: genres,
    };
  }
}
