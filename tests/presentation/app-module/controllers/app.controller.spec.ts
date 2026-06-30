import { AppController } from '@presentation/app-module/controllers/app.controller';
import { AppRepository } from '@infra/repositries/app.repository';
import { AppInfoUseCase } from '@application/user-cases/app-info.use-case';
import { Test, TestingModule } from '@nestjs/testing';
import { ReplicType } from '@infra/databases/pg-promise/connection';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppInfoUseCase;
  let mockGetDataBase: jest.Mock;

  beforeEach(async () => {
    mockGetDataBase = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AppController],
      providers: [
        AppInfoUseCase,
        { provide: 'IAppRepository', useClass: AppRepository },
        {
          provide: 'DATABASE_CONNECTION',
          useValue: mockGetDataBase,
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppInfoUseCase>(AppInfoUseCase);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
    expect(appService).toBeDefined();
  });

  it('should mock database connection', () => {
    mockGetDataBase(ReplicType.MASTER);
    expect(mockGetDataBase).toHaveBeenCalledWith(ReplicType.MASTER);
  });
});
