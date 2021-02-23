import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AccountService } from './account.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(private readonly _accountService:AccountService) {}

    async use(req: Request, res: Response, next: NextFunction) {
        try {
            let auth: string = req.headers.authorization;
            if (auth === undefined) {
                throw new Error('No token found');
            } else {
                let str: string[] = auth.split(' ');
                auth = str[1];
                let account: any = await this._accountService.ping(auth);
                res.locals.account = account;
                next();
            }
        } catch(err) {
            res.status(HttpStatus.BAD_REQUEST).json(err.message);
        }
    }
}
