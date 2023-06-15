import { UserRole } from "../enums/user-role.enum";

export interface IUser {
    id: number;
    email: string;
    password: string;
    name: string;
    isActive: boolean;
    role: UserRole;
}