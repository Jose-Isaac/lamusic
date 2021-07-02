export class Genre {
  constructor(private readonly id: string, private name: string) {}

  public getId(): string {
    return this.id;
  }
  public getName(): string {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }
}
