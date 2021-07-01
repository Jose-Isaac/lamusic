import { Genre } from './Genre';

export class Music {
  constructor(
    private readonly extern_id: string,
    private title: string,
    private author_id: number,
    private created_at: Date,
    private updated_at: Date,
    private album: string,
    private genre: Array<Genre>,
    private id?: number
  ) {}

  public getId(): number | undefined {
    return this.id;
  }
  public getExternId(): string {
    return this.extern_id;
  }
  public getTitle(): string {
    return this.title;
  }
  public getAuthorId(): number {
    return this.author_id;
  }
  public getCreatedAt(): Date {
    return this.created_at;
  }
  public getUpdatedAt(): Date {
    return this.updated_at;
  }
  public getAlbum(): string {
    return this.album;
  }
  public getGenre(): Array<Genre> {
    return this.genre;
  }

  public setTitle(title: string): void {
    this.title = title;
  }
  public setAlbum(album: string): void {
    this.album = album;
  }
  public setGenre(genre: Genre): void {
    this.genre.push(genre);
  }
}
