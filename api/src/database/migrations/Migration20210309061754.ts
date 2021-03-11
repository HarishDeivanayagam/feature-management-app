import { Migration } from '@mikro-orm/migrations';

export class Migration20210309061754 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "tenants" ("id" varchar(255) not null, "name" varchar(50) not null, "is_active" bool not null default true, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "plan" varchar(250) not null);');
    this.addSql('alter table "tenants" add constraint "tenants_pkey" primary key ("id");');
    this.addSql('alter table "tenants" add constraint "tenants_name_unique" unique ("name");');

    this.addSql('create table "users" ("id" varchar(255) not null, "email" varchar(150) not null, "name" varchar(100) not null, "password" varchar(60) not null, "is_verified" bool not null default false, "is_active" bool not null default true, "is_admin" bool not null default false, "tenant_id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "users" add constraint "users_pkey" primary key ("id");');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');

    this.addSql('create table "segments" ("id" serial primary key, "name" varchar(255) not null, "tenant_id" varchar(255) not null, "creator_id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');

    this.addSql('create table "feedback_group" ("id" serial primary key, "feedback" varchar(250) not null, "description" varchar(500) not null, "count" int4 not null default 0, "creator" varchar(255) not null default \'EXT_API\', "tenant_id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');

    this.addSql('create table "feedback" ("id" serial primary key, "feedback" varchar(250) not null, "description" varchar(500) not null, "tenant_id" varchar(255) not null, "is_grouped" bool not null default false, "group_id" int4 null, "creator_name" varchar(50) null, "creator_email" varchar(100) null, "is_closed" bool not null default false, "segment_id" int4 null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');

    this.addSql('alter table "users" add constraint "users_tenant_id_foreign" foreign key ("tenant_id") references "tenants" ("id") on update cascade;');

    this.addSql('alter table "segments" add constraint "segments_tenant_id_foreign" foreign key ("tenant_id") references "tenants" ("id") on update cascade;');
    this.addSql('alter table "segments" add constraint "segments_creator_id_foreign" foreign key ("creator_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "feedback_group" add constraint "feedback_group_tenant_id_foreign" foreign key ("tenant_id") references "tenants" ("id") on update cascade;');

    this.addSql('alter table "feedback" add constraint "feedback_tenant_id_foreign" foreign key ("tenant_id") references "tenants" ("id") on update cascade;');
    this.addSql('alter table "feedback" add constraint "feedback_group_id_foreign" foreign key ("group_id") references "feedback_group" ("id") on update cascade on delete set null;');
    this.addSql('alter table "feedback" add constraint "feedback_segment_id_foreign" foreign key ("segment_id") references "segments" ("id") on update cascade on delete set null;');
  }

}
