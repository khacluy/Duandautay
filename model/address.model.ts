export class Address {
    Id!: number;
    Name!: string;
    Districts!: District[];
}
export class District {
    Id!: number;
    Name!: string;
    Wards!: Ward[];
}
export class Ward {
    Id!: number;
    Name!: string;
}