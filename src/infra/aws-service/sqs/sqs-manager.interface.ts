export interface SqsMessage {
  messageId: string;
  receiptHandle: string;
  body: string;
  attributes?: Record<string, string>;
  receivedAt: Date;
}

export interface ISqsManager {
  sendMessage(queueUrl: string, body: string, attributes?: Record<string, string>): Promise<string>;
  receiveMessages(
    queueUrl: string,
    maxMessages: number,
    waitTimeSeconds: number,
  ): Promise<SqsMessage[]>;
  deleteMessage(queueUrl: string, receiptHandle: string): Promise<void>;
}
