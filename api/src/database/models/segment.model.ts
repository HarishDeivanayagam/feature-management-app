import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Feedback } from "./feedback.model";
import { Tenant } from "./tenant.model";
import { User } from "./user.model";

@Entity({ tableName:"segments" })
export class Segment {
    @PrimaryKey()
    id!: number;

    @Property({nullable:false})
    name:string;

    @ManyToOne(()=>Tenant, {nullable:false})
    tenant: Tenant;

    @ManyToOne(()=>User, {nullable:false})
    creator: User

    @OneToMany("Feedback", "segment")
    feedbacks = new Collection(this);

    @Property()
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();

}