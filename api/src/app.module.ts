import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import config from './mikro-orm.config';

@Module({
  imports: [
    MikroOrmModule.forRoot(config),
    AccountModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
