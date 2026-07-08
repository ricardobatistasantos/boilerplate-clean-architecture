import { Module } from '@nestjs/common';
import { AxiosClient } from './axios-client';

@Module({
  providers: [{
      provide: 'HTTP_CLIENT_01',
      useFactory: () => {
        const baseURL = 'http://localhost:3000';
        return new AxiosClient({
          baseURL: baseURL,
          timeout: 10000,
          headers: {
            Authorization: `Bearer ''`,
            'Content-Type': 'application/json',
          },
        });
      },
    }],
  exports: [AxiosClient],
})
export class HttpModule {}