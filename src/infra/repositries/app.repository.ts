import { App } from '@domain/entities/app.entity';
import { IAppRepository } from '@domain/repositories/app.repository';
import { Inject } from '@nestjs/common';

export class AppRepository implements IAppRepository {
  constructor(@Inject('DATABASE_CONNECTION') private readonly connection) {}

  async info() {
    return new App({ name: 'App', version: '0.0.1' });
  }
}
