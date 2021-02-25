import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { Customer } from 'src/database/models/customer.model';
import { User } from 'src/database/models/user.model';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { BcryptLib, JwtLib } from 'src/misc/external.dep';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AdminGuard } from './admin.guard';

@Module({
    imports:[MikroOrmModule.forFeature([Customer, User])],
    controllers:[AccountController],
    providers:[
        AccountService,
        BcryptLib,
        JwtLib,
        AdminGuard,
    ],
    exports: [
        AdminGuard,
    ]
})
export class AccountModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                { path: 'accounts/users', method: RequestMethod.ALL }
            );
    }
}
