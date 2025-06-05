export declare class OrderCreateEvent {
    readonly name: string;
    readonly amount: number;
    readonly totalPrice: number;
    constructor(name: string, amount: number, totalPrice: number);
}
