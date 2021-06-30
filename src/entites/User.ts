export class User {
  constructor(
    private readonly extern_id: string,
    private name: string,
    private nickname: string,
    private email: string,
    private password: string,
    private role?: string,
    private created_at?: Date,
    private updated_at?: Date
  ) {}

  public getId(): string {
    return this.extern_id;
  }
  public getName(): string {
    return this.name;
  }
  public getNickname(): string {
    return this.nickname;
  }
  public getEmail(): string {
    return this.email;
  }
  public getPassword(): string {
    return this.password;
  }
  public getRole(): string | undefined {
    return this.role;
  }
  public getCreatedAt(): Date | undefined {
    return this.created_at;
  }
  public getUpdatedAt(): Date | undefined {
    return this.updated_at;
  }

  public setName(name: string): void {
    this.name = name;
  }
  public setNickname(nickname: string): void {
    this.nickname = nickname;
  }
  public setEmail(email: string): void {
    this.email = email;
  }
  public setPassword(password: string): void {
    this.password = password;
  }
  public setUpdatedAt(updated_at: Date): void {
    this.updated_at = updated_at;
  }
}
