import { Migration } from '@mikro-orm/migrations';

export class Migration20210225040218 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "feedback_group" ("id" serial primary key, "feedback" varchar(250) not null, "description" varchar(500) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');

    this.addSql('create table "customers" ("uuid" varchar(255) not null, "name" varchar(50) not null, "is_active" bool not null default true, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "plan" varchar(250) not null);');
    this.addSql('alter table "customers" add constraint "customers_pkey" primary key ("uuid");');

    this.addSql('create table "feedback" ("id" serial primary key, "feedback" varchar(250) not null, "description" varchar(500) not null, "customer_uuid" varchar(255) not null, "group_id" int4 null, "is_grouped" bool not null default false, "upvotes" int4 not null default 0, "creator_name" varchar(50) not null, "creator_email" varchar(100) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');

    this.addSql('create table "users" ("uuid" varchar(255) not null, "email" varchar(150) not null, "name" varchar(100) not null, "password" varchar(60) not null, "is_verified" bool not null default false, "is_active" bool not null default true, "is_admin" bool not null default false, "customer_uuid" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "users" add constraint "users_pkey" primary key ("uuid");');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');

    this.addSql('alter table "feedback" add constraint "feedback_customer_uuid_foreign" foreign key ("customer_uuid") references "customers" ("uuid") on update cascade;');
    this.addSql('alter table "feedback" add constraint "feedback_group_id_foreign" foreign key ("group_id") references "feedback_group" ("id") on update cascade on delete set null;');

    this.addSql('alter table "users" add constraint "users_customer_uuid_foreign" foreign key ("customer_uuid") references "customers" ("uuid") on update cascade;');
  }

}
