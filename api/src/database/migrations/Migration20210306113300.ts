import { Migration } from '@mikro-orm/migrations';

export class Migration20210306113300 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "feedback" drop constraint if exists "feedback_segment_id_check";');
    this.addSql('alter table "feedback" alter column "segment_id" type int4 using ("segment_id"::int4);');
    this.addSql('alter table "feedback" alter column "segment_id" drop not null;');
  }

}
