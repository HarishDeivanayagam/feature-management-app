import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';

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

    @Property()
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();


}
