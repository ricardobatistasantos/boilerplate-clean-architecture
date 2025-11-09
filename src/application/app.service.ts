import { Inject, Injectable } from '@nestjs/common';
import { BaseUseCase } from '@domain/base-use-case.interface';
import { IAppRepository } from '@domain/repositories/app.repository';
import { AppResponse } from './dtos/app.response';

@Injectable()
export class AppService implements BaseUseCase<void, AppResponse> {
  constructor(
    @Inject('IAppRepository') private readonly appRepository: IAppRepository,
  ) {}

  execute(): Promise<AppResponse> {
    return this.appRepository.info();
  }
}
