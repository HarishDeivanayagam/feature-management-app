import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Customer } from 'src/database/models/customer.model';
import { Feedback } from 'src/database/models/feedback.model';
import { FeedbackController } from './feeback.controller';
import { FeedbackService } from './feedback.service';

@Module({
    imports:[
        MikroOrmModule.forFeature([
            Customer,
            Feedback
        ])
    ],
    controllers:[
        FeedbackController
    ],
    providers:[
        FeedbackService
    ]
})
export class FeedbackModule {}
