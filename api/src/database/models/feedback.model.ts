import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Customer } from "./customer.model";
import { FeedbackGroup } from "./feedbackgroup.model";

@Entity({ tableName: "feedback" })
export class Feedback {
    
    @PrimaryKey()
    id!: number;

    @Property({ length: 250, nullable:false })
    feedback: string;

    @Property({ length: 500 })
    description: string;

    @ManyToOne(()=>Customer)
    customer: Customer;

    @ManyToOne(()=>FeedbackGroup, {nullable:true})
    group: FeedbackGroup;

    @Property({ default: false })
    isGrouped:boolean;

    @Property({ default:0, nullable:false })
    upvotes: number;

    @Property({ length:50 })
    creatorName: string;

    @Property({ length: 100 })
    creatorEmail: string;

    @Property()
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();

}
