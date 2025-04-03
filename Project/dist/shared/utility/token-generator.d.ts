import * as jwt from "jsonwebtoken";
export declare const generateToken: (id: string, type: string) => string;
export declare const decodeToken: (token: string) => string | jwt.JwtPayload;
