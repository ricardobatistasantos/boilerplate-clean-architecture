import { Injectable } from '@nestjs/common';
import {
  SQSClient,
  SendMessageCommand,
  ReceiveMessageCommand,
  DeleteMessageCommand,
} from '@aws-sdk/client-sqs';
import { ISqsManager, SqsMessage } from './sqs-manager.interface';
export const SQS_ADAPTER_TOKEN = 'SQS_ADAPTER_TOKEN';

@Injectable()
export class SqsManager implements ISqsManager {
  private readonly client: SQSClient;

  constructor() {
    this.client = new SQSClient({
      region: process.env.AWS_REGION || "us-east-1",
      endpoint: process.env.AWS_ENDPOINT_URL || "http://localhost:4566",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "mock",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "mock",
      },
    });
  }

  async sendMessage(
    queueUrl: string,
    body: string,
    attributes?: Record<string, string>,
  ): Promise<string> {
    const messageAttributes = attributes
      ? Object.entries(attributes).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: { DataType: 'String', StringValue: value },
        }),
        {},
      )
      : undefined;

    const command = new SendMessageCommand({
      QueueUrl: queueUrl,
      MessageBody: body,
      MessageAttributes: messageAttributes,
    });

    const result = await this.client.send(command);
    return result.MessageId!;
  }

  async receiveMessages(
    queueUrl: string,
    maxMessages: number,
    waitTimeSeconds: number,
  ): Promise<SqsMessage[]> {
    const command = new ReceiveMessageCommand({
      QueueUrl: queueUrl,
      MaxNumberOfMessages: maxMessages,
      WaitTimeSeconds: waitTimeSeconds,
      MessageAttributeNames: ['All'],
    });

    const result = await this.client.send(command);

    if (!result.Messages || result.Messages.length === 0) {
      return [];
    }

    return result.Messages.map((message) => ({
      messageId: message.MessageId!,
      receiptHandle: message.ReceiptHandle!,
      body: message.Body!,
      attributes: message.MessageAttributes
        ? Object.entries(message.MessageAttributes).reduce(
          (acc, [key, attr]) => ({
            ...acc,
            [key]: attr.StringValue ?? '',
          }),
          {},
        )
        : undefined,
      receivedAt: new Date(),
    }));
  }

  async deleteMessage(queueUrl: string, receiptHandle: string): Promise<void> {
    const command = new DeleteMessageCommand({
      QueueUrl: queueUrl,
      ReceiptHandle: receiptHandle,
    });

    await this.client.send(command);
  }
}
