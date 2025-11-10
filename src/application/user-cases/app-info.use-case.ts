import { Inject, Injectable } from '@nestjs/common';
import { BaseUseCase } from '@domain/base-use-case.interface';
import { IAppRepository } from '@domain/repositories/app.repository';
import { AppResponseDto } from '../dtos/app.response.dto';

@Injectable()
export class AppInfoUseCase implements BaseUseCase<void, AppResponseDto> {
  constructor(
    @Inject('IAppRepository') private readonly appRepository: IAppRepository,
  ) {}

  execute(): Promise<AppResponseDto> {
    return this.appRepository.info();
  }
}
