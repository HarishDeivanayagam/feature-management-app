import { Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Tenant } from "./tenant.model";
import { FeedbackGroup } from "./feedbackgroup.model";
import { Segment } from "./segment.model";

@Entity({ tableName: "feedback" })
export class Feedback {
    
    @PrimaryKey()
    id!: number;

    @Property({ length: 250, nullable:false })
    feedback: string;

    @Property({ length: 500 })
    description: string;

    @ManyToOne(()=>Tenant)
    tenant: Tenant;

    @Property({ default: false })
    isGrouped:boolean;

    @ManyToOne(()=>FeedbackGroup, {nullable:true})
    group: FeedbackGroup;

    @Property({ length:50, nullable:true })
    creatorName: string;

    @Property({ length: 100, nullable:true })
    creatorEmail: string;

    @Property({ default: false })
    isClosed:boolean;

    @ManyToOne(()=>Segment, {nullable:true})
    segment:Segment;

    @Property()
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();

}
