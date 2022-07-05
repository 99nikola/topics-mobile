export enum ROLE {
    ADMIN = "admin",
    BASIC = "basic"
}

export type SignInResponse = {
    user: IUser;
    token: string;
};

export interface IUser {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    about: string;
    avatar: string | null;
    isActive: boolean;
    roles: {
        Name: ROLE;
    };
}

export interface ISignIn {
    username: string;
    password: string;
}

export interface ISignUp {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    firstName: string;
    lastName: string;
}
