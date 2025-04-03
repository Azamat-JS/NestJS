import * as jwt from "jsonwebtoken"

export const generateToken = (id:string, type:string) => {
    return jwt.sign({id, type}, 
                    process.env.JWT_SECRET as string, 
                   {expiresIn: process.env.JWT_TIME})
}

export const decodeToken = (token:string) => {
    return jwt.verify(token, process.env.JWT_SECRET as string)
}

