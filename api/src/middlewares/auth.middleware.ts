import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from "jsonwebtoken"
import { appsecret } from 'src/appconfig/app.config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor() {}

    async use(req: Request, res: Response, next: NextFunction) {
        try {
            let auth: string = req.headers.authorization;
            if (auth === undefined) {
                throw new Error('No token found');
            } else {
                let str: string[] = auth.split(' ');
                auth = str[1];
                let decoded = jwt.verify(auth, appsecret);
                if (decoded) {
                    res.locals.account = decoded;
                    next();
                } else {
                  throw new Error('Invalid Token');
                }
            }
        } catch(err) {
            res.status(HttpStatus.BAD_REQUEST).json(err.message);
            return;
        }
    }
}
