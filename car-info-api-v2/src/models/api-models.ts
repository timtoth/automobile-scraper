export interface ApiUser {
    cars: CarApiModel[];
    id: number;
    name: string;
    email: string;
    password: string;
}

export interface CarApiModel {
    id: number;
    make: string;
    model: string;
    year: number;
}