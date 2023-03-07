import { Address } from "../interfaces/user-adress.interface";
import { Company } from "../interfaces/user-company.inteface"; 

export class User {
    public id!: number;
    public name?: string;
    public username?: string;
    public email?: string;
    public address?: Address;
    public phone?: string;
    public website?: string;
    public company?: Company;
}