import { Entity, ManyToOne, PrimaryKey, Property, Unique } from "@mikro-orm/core";
import { Customer } from "./customer.model";
import { v4 } from 'uuid';

@Entity({ tableName: 'users' })
export class User {

    @PrimaryKey()
    uuid: string = v4();  

    @Property({ nullable: false, length: 150 })
    @Unique()
    email!: string;

    @Property({ length: 100 })
    name: string;

    @Property({ length: 60, nullable: false })
    password: string;

    @Property({ default:false })
    isVerified: boolean;

    @Property({ nullable:false, default:true })
    isActive:boolean;

    @Property({ nullable:false, default: false })
    isAdmin:boolean;

    @ManyToOne(()=>Customer)
    customer:Customer;

    @Property()
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();
    
}