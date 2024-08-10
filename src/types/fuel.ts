export interface IRefuelHistory {
    stationName: string;
    location: string;
    litersFilled: string;
    cost: number;
    refuelDate: Date;
    fuelName: string;
    _id: string;
}

export interface IFuel {
    _id: string;
    logo: string;
    name: string;
    price: number;
    color: string;
    scores: number;
    discount: number;
}

export interface IOrderFuel {
    name: string;
    price: number;
    color: string;
    literQuantity: number;
    scores: number;
    discount: number;
}

export interface IRefuelData {
    fuelName: string;
    stationName: string;
    location: string;
    litersFilled: number;
    cost: number;
    scores: number;
    costPerLiter: number;
}
