import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { FeedbackModule } from './feedback/feedback.module';
import { SegmentModule } from './segment/segment.module';
import config from './mikro-orm.config';

@Module({
  imports: [
    MikroOrmModule.forRoot(config),
    AccountModule,
    FeedbackModule,
    SegmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
