export class Album {
  constructor(
    private readonly id: string,
    private name: string,
    private created_at?: Date
  ) {}

  public getId(): string {
    return this.id;
  }
  public getName(): string {
    return this.name;
  }
  public getCreatedAt(): Date | undefined {
    return this.created_at;
  }

  public setName(name: string) {
    this.name = name;
  }
  public setCreatedAt(date: Date) {
    this.created_at = date;
  }
}
