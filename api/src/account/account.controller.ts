import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import { AddNewUserDto, CreateAccountDto, LoginAccountDto } from "./account.dto";
import { AccountService } from "./account.service";
import { AdminGuard } from "./admin.guard";

@ApiTags("Accounts")
@Controller("accounts")
export class AccountController {

    constructor(private readonly _accountService:AccountService) {}
    
    @HttpCode(201)
    @Post("")
    async createAccount(@Res() res:Response, @Body() account:CreateAccountDto) {
        try {
            let resp = await this._accountService.createAccount(account.company, account.user, account.email, account.password);
            res.status(HttpStatus.CREATED).json(resp);
            return;
        } catch(err) {
            res.status(HttpStatus.BAD_REQUEST).json(err.message);
            return;
        }
    }

    @HttpCode(200)
    @Post("/authenticate")
    async loginAccount(@Res() res:Response, @Body() user:LoginAccountDto) {
        try {
            let resp = await this._accountService.authenticate(user.email, user.password);
            res.status(HttpStatus.OK).json(resp);
            return;
        } catch(err) {
            res.status(HttpStatus.BAD_REQUEST).json(err.message);
            return;
        }
    }

    @ApiBearerAuth()
    @HttpCode(200)
    @Post("/ping")
    async accountVerify(@Res() res:Response, @Req() req:Request) {
        try {
            console.log(req.headers)
            let auth: string = req.headers.authorization;
            if (auth === undefined) {
              throw new Error('No token found');
            } else {
              let str: string[] = auth.split(' ');
              auth = str[1];
              let user: any = await this._accountService.ping(auth);
              res.status(HttpStatus.OK).json(user);
              return;
            }
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).json(err.message);
            return;
        }
    }

    
    @ApiBearerAuth()
    @HttpCode(200)
    @Post("/users")
    @UseGuards(AdminGuard)
    async addNewUser(@Res() res:Response, @Body() user:AddNewUserDto) {
        try {
            let resp = await this._accountService.addUser(res.locals.account.customer, user.name, user.email, user.password, user.isAdmin);
            res.status(HttpStatus.CREATED).json(resp);
            return;
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).json(err.message);
            return;
        }
    }

}
