import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Unique } from "@mikro-orm/core";
import { Tenant } from "./tenant.model";
import { v4 } from 'uuid';

@Entity({ tableName: 'users' })
export class User {

    @PrimaryKey()
    id: string = v4();  

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

    @ManyToOne(()=>Tenant)
    tenant:Tenant;

    @OneToMany("Segment", "creator")
    segments = new Collection(this);

    @Property()
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();
    
}