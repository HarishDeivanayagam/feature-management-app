import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { Tenant } from 'src/database/models/tenant.model';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { Segment } from 'src/database/models/segment.model';
import { SegmentService } from './segment.service';
import { SegmentController } from './segment.controller';
import { User } from 'src/database/models/user.model';

@Module({
    imports:[
        MikroOrmModule.forFeature([
            Tenant,
            User,
            Segment,
        ]),
    ],
    controllers:[
        SegmentController
    ],
    providers:[
        SegmentService,
    ]
})
export class SegmentModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                { path: 'segments', method: RequestMethod.ALL },
            );
    }
}
