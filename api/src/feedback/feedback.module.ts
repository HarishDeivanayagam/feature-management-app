import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { Customer } from 'src/database/models/customer.model';
import { Feedback } from 'src/database/models/feedback.model';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { FeedbackController } from './feeback.controller';
import { FeedbackService } from './feedback.service';

@Module({
    imports:[
        MikroOrmModule.forFeature([
            Customer,
            Feedback
        ]),
    ],
    controllers:[
        FeedbackController
    ],
    providers:[
        FeedbackService,
    ]
})
export class FeedbackModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                { path: 'feedback', method: RequestMethod.GET }
            );
    }
}
