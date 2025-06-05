export class OrderCreateEvent {
  constructor(
    public readonly name: string,
    public readonly amount: number,
    public readonly totalPrice: number
  ) {}
}
