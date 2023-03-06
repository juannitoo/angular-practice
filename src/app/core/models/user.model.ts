import { Address } from "../interfaces/user-adress.interface";
import { Company } from "../interfaces/user-company.inteface"; 

export class User {
    id!: number;
    name?: string;
    username?: string;
    email?: string;
    address?: Address;
    phone?: string;
    website?: string;
    company?: Company;
}