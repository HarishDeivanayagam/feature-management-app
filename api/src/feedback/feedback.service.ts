import { EntityManager } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import { Customer } from "src/database/models/customer.model";
import { Feedback } from "src/database/models/feedback.model";

@Injectable()
export class FeedbackService {
    
    constructor(private readonly _em:EntityManager) {}

    public async insertFeedback(feedback:string, description: string, customer: string, creatorName: string, creatorEmail: string): Promise<string> {
        try {
            let tfeedback = new Feedback();
            let tcustomer = await this._em.findOne(Customer, { uuid: customer })
            tfeedback.feedback = feedback;
            tfeedback.description = description;
            tfeedback.customer = tcustomer;
            tfeedback.creatorName = creatorName;
            tfeedback.creatorEmail = creatorEmail;
            await this._em.persistAndFlush(tfeedback);
            return "Feedback Inserted";
        } catch(err) {
            throw new Error("Unable to insert feedback");
        }
    }

    public async upVoteFeedback(feedback:number, customer: string) {
        try {
            let tfeedback = await this._em.findOne(Feedback, { id: feedback, customer: customer })
            tfeedback.upvotes = tfeedback.upvotes + 1;
            await this._em.persistAndFlush(tfeedback);
        } catch(err) {
            throw new Error("Unable to upvote");
        }
    }

    public async downVoteFeedback(feedback:number, customer: string) {
        try {
            let tfeedback = await this._em.findOne(Feedback, { id: feedback, customer: customer })
            if(tfeedback.upvotes > 0) {
                tfeedback.upvotes = tfeedback.upvotes - 1;
                await this._em.persistAndFlush(tfeedback);
            } else {
                throw new Error("Cannot down vote since no upvote is present");
            }
        } catch(err) {
            throw new Error("Unable to upvote");
        }
    }

}
