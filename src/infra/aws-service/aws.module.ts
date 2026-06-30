import { Module } from '@nestjs/common';
import { SQS_ADAPTER_TOKEN, SqsManager } from './sqs/sqs-manager';
import { SNS_ADAPTER_TOKEN, SnsManager } from './sns/sns-manager';
import { S3_ADAPTER_TOKEN, S3Manager } from './s3/s3-manager';

@Module({
  providers: [
    {
      provide: SQS_ADAPTER_TOKEN,
      useClass: SqsManager,
    },
    {
      provide: SNS_ADAPTER_TOKEN,
      useClass: SnsManager,
    },
    {
      provide: S3_ADAPTER_TOKEN,
      useClass: S3Manager,
    },
  ],
  exports: [
    SQS_ADAPTER_TOKEN,
    SNS_ADAPTER_TOKEN,
    S3_ADAPTER_TOKEN
  ],
})
export class SqsModule { }
