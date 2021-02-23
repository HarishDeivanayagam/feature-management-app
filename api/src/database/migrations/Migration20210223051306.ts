import { Migration } from '@mikro-orm/migrations';

export class Migration20210223051306 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "customers" ("uuid" varchar(255) not null, "name" varchar(50) not null, "is_active" bool not null default true, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "plan" varchar(250) not null);');
    this.addSql('alter table "customers" add constraint "customers_pkey" primary key ("uuid");');

    this.addSql('create table "users" ("uuid" varchar(255) not null, "email" varchar(150) not null, "name" varchar(100) not null, "password" varchar(60) not null, "is_verified" bool not null default false, "is_active" bool not null default true, "customer_uuid" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "users" add constraint "users_pkey" primary key ("uuid");');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');

    this.addSql('alter table "users" add constraint "users_customer_uuid_foreign" foreign key ("customer_uuid") references "customers" ("uuid") on update cascade;');
  }

}
