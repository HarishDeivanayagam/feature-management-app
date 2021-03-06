import { EntityManager } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import { Tenant } from "src/database/models/tenant.model";
import { Feedback } from "src/database/models/feedback.model";
import { Segment } from "src/database/models/segment.model";

@Injectable()
export class FeedbackService {
    
    constructor(private readonly _em:EntityManager) {}

    public async insertFeedback(feedback:string, description: string, tenant: string, creatorName: string, creatorEmail: string) {
        try {
            let tfeedback = new Feedback();
            let ttenant = await this._em.findOne(Tenant, { id: tenant })
            tfeedback.feedback = feedback;
            tfeedback.description = description;
            tfeedback.tenant = ttenant;
            tfeedback.creatorName = creatorName;
            tfeedback.creatorEmail = creatorEmail;
            await this._em.persistAndFlush(tfeedback);
            return tfeedback;
        } catch(err) {
            throw new Error("Unable to insert feedback");
        }
    }

    public async allFeedback(tenant:string) {
        try {
            let feedbacks = await this._em.find(Feedback, { tenant: tenant });
            return feedbacks;
        } catch(err) {
            throw new Error("Unable to fetch data");
        }
    }

    public async segmentizeFeedback(segment:number, feedback:number, tenant:string) {
        try {
            let tfeedback = await this._em.findOne(Feedback, { id: feedback, tenant: tenant });
            let tsegment = await this._em.findOne(Segment, {id:segment, tenant: tenant});
            if(tfeedback && tsegment) {
                tfeedback.segment = tsegment;
                await this._em.persistAndFlush(tfeedback);
                return tfeedback;
            } else {
                throw new Error("Unable to segment feedback")
            }
        } catch(err) {
            throw new Error("Unable to segment feedback")
        }
    }

}
