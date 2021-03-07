import { EntityManager } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import { Tenant } from "src/database/models/tenant.model";
import { Feedback } from "src/database/models/feedback.model";
import { Segment } from "src/database/models/segment.model";
import { FeedbackGroup } from "src/database/models/feedbackgroup.model";
import e from "express";

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

    public async segmentizeFeedback(segment:number|null, feedback:number, tenant:string) {
        try {
            let tfeedback = await this._em.findOne(Feedback, { id: feedback, tenant: tenant });
            let tsegment = null;
            if(segment!==null) {
                tsegment =  await this._em.findOne(Segment, {id:segment, tenant: tenant});
            }
            if(!tfeedback) {
                throw new Error("Unable to segment feedback");
            }
            if(tfeedback.isGrouped) {
                let simFeedback = await this._em.find(Feedback, { group: tfeedback.group, tenant:tenant })
                for(let i in simFeedback) {
                    simFeedback[i]['segment'] = tsegment;
                    this._em.persist(simFeedback[i]);
                }
                this._em.flush();
            } else {
                tfeedback.segment = tsegment;
                await this._em.persistAndFlush(tfeedback);
                return tfeedback;
            }
        } catch(err) {
            throw new Error("Unable to segment feedback")
        }
    }


    public async groupFeedback(feedback: Array<number>, tenant:string) {
        try {
            let group = new FeedbackGroup();
            
            let temp = await this._em.findOne(Feedback, { id: feedback[0], tenant: tenant });
            group.feedback = temp.feedback;
            group.description = temp.description;
            group.count = 0;
            for(let i in feedback) { 
                let fdk = await this._em.findOne(Feedback, { id: feedback[i], tenant: tenant });
                if(fdk.isGrouped) {
                    throw new Error("Already grouped");
                }
                fdk.group = group;
                fdk.segment = temp.segment;
                fdk.isGrouped = true;
                this._em.persist(fdk);
                group.count += 1;
            }
            this._em.persist(group);
            await this._em.flush();
            return "Feedbacks Grouped";
        }  catch(err) {
            throw new Error("Unable to group feedback")
        }
    }
}
