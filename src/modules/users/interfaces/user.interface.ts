import { IAuth } from "../../auth/interfaces/auth.interface";

export interface IUser extends IAuth {
    userId: number;
    username: string;
    password: string;
    email: string;
}
