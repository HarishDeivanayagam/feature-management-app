import { Migration } from '@mikro-orm/migrations';

export class Migration20210306091857 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "tenants" add constraint "tenants_name_unique" unique ("name");');
  }

}
