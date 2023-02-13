// utilisé par jsonplaceholder users
import { Geo } from "./user-geo.interface";

export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}