import { EntityManager } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import { Tenant } from "src/database/models/tenant.model";
import { Feedback } from "src/database/models/feedback.model";

@Injectable()
export class FeedbackService {
    
    constructor(private readonly _em:EntityManager) {}

    public async insertFeedback(feedback:string, description: string, tenant: string, creatorName: string, creatorEmail: string): Promise<string> {
        try {
            let tfeedback = new Feedback();
            let ttenant = await this._em.findOne(Tenant, { id: tenant })
            tfeedback.feedback = feedback;
            tfeedback.description = description;
            tfeedback.tenant = ttenant;
            tfeedback.creatorName = creatorName;
            tfeedback.creatorEmail = creatorEmail;
            await this._em.persistAndFlush(tfeedback);
            return "Feedback Inserted";
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


}
