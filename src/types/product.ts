export interface IProduct {
    _id: string;
    name: string;
    scoresCount: number;
    type: 'main' | 'dessert' | 'drinks';
}

export interface IOrderProduct {
    productId: string;
    quantity: number;
    scoresCount: number;
}
