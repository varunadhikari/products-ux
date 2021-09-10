import { UserDetails } from "./user.details";

export class User {
    id?: string;
    password: string;
    role: string;
    userDetails: UserDetails;
    token? : string;
}