import { Inject, Injectable } from '@nestjs/common';
import { BaseUseCase } from '@domain/base-use-case.interface';
import { IAppRepository } from '@domain/repositories/app.repository';
import { App } from '@domain/entities/app';

@Injectable()
export class AppService implements BaseUseCase<void, App> {
  constructor(
    @Inject('IAppRepository') private readonly appRepository: IAppRepository,
  ) {}

  execute(): Promise<App> {
    return this.appRepository.info();
  }
}
