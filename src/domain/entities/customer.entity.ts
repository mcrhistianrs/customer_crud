export class Customer {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly instagram?: string,
    public readonly facebook?: string,
  ) {}
}
