import { Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { v4 } from 'uuid';

@Entity({ tableName: "customers" })
export class Customer {

    @PrimaryKey()
    uuid: string = v4();
  
    @Property({ length:50, nullable:false })
    name:string

    @OneToMany("User", "customer")
    users = new Collection(this);

    @OneToMany("Feedback", "customer")
    feedback = new Collection(this);

    @Property({ nullable:false, default:true })
    isActive:boolean;

    @Property()
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();
    
    @Property({ length:250, nullable:false })
    plan: string;
}
