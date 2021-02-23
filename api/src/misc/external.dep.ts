import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

export const JwtLib = {
    provide: "JWT",
    useValue: jwt
}

export type IJwt = typeof JwtLib.useValue;

export const BcryptLib = {
    provide: "BCRYPT",
    useValue: bcrypt
}

export type IBcrypt = typeof BcryptLib.useValue;


