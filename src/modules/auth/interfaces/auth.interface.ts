export interface IAuth {
    userId: number;
    username: string;
}

export interface IPayloadAuth {
    username: string;
    sub: number;
    iat: number;
    exp: number;
}
