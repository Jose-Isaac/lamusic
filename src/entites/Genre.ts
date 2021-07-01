export class Genre {
  constructor(
    private readonly id: number,
    private readonly extern_id: string,
    private name: string
  ) {}

  public getId(): number {
    return this.id;
  }
  public getExternId(): string {
    return this.extern_id;
  }
  public getName(): string {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }
}
