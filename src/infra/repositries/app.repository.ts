import { App } from '@domain/entities/app';
import { IAppRepository } from '@domain/repositories/app.repository';
import { Inject } from '@nestjs/common';

export class AppRepository implements IAppRepository {
  constructor(@Inject('DATABASE_CONNECTION') private readonly connection) {}

  async info() {
    const teste = await this.connection()
    .query('select * from teste');

    console.log(teste);
    return new App({ name: 'App', version: '0.0.1' });
  }
}
