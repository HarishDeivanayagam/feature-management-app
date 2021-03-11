import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Tenant } from './tenant.model';

@Entity({ tableName: 'feedback_group' })
export class FeedbackGroup {
    
    @PrimaryKey()
    id:number

    @Property({ length: 250, nullable:false })
    feedback: string;

    @Property({ length: 500 })
    description: string;

    @OneToMany("Feedback", "group")
    feedbacks = new Collection(this);

    @Property({ default:0 })
    count: number;

    @Property({ default:"EXT_API"})
    creator:string;

    @ManyToOne(()=>Tenant)
    tenant: Tenant;
    
    @Property()
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();


}
