import { Injectable } from '@nestjs/common';
import {
  SNSClient,
  PublishCommand,
  CreateTopicCommand,
} from '@aws-sdk/client-sns';
import { ISnsManager } from './sns-manager.interface';
export const SNS_ADAPTER_TOKEN = 'SNS_ADAPTER_TOKEN';

@Injectable()
export class SnsManager implements ISnsManager {
  private readonly client: SNSClient;

  constructor() {
    this.client = new SNSClient({
      region: process.env.AWS_REGION || "us-east-1",
      endpoint: process.env.AWS_ENDPOINT_URL || "http://localhost:4566",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "mock",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "mock",
      },
    });
  }

  async publish(
    topicArn: string,
    message: string,
    attributes?: Record<string, string>,
  ): Promise<string> {
    const messageAttributes = attributes
      ? Object.entries(attributes).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: {
            DataType: 'String',
            StringValue: value,
          },
        }),
        {},
      )
      : undefined;

    const command = new PublishCommand({
      TopicArn: topicArn,
      Message: message,
      MessageAttributes: messageAttributes,
    });

    const result = await this.client.send(command);

    return result.MessageId!;
  }

  async createTopic(name: string): Promise<string> {
    const command = new CreateTopicCommand({
      Name: name,
    });

    const result = await this.client.send(command);

    return result.TopicArn!;
  }
}