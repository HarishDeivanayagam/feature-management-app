import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Customer } from 'src/database/models/customer.model';
import { User } from 'src/database/models/user.model';
import { BcryptLib, JwtLib } from 'src/misc/external.dep';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
    imports:[MikroOrmModule.forFeature([Customer, User])],
    controllers:[AccountController],
    providers:[
        AccountService,
        BcryptLib,
        JwtLib
    ]
})
export class AccountModule {}
