import { Address } from "../interfaces/adress.interface";
import { Company } from "../interfaces/company.inteface"; 

export class User {
    id!: number;
    name!: string;
    username?: string;
    email?: string;
    address?: Address;
    phone?: string;
    website?: string;
    company?: Company;
}