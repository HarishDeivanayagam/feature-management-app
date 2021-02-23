import { Migration } from '@mikro-orm/migrations';

export class Migration20210223090614 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "users" add column "is_admin" bool not null default false;');
  }

}
