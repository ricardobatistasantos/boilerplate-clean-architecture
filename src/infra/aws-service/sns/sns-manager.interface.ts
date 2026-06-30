export interface ISnsManager {
  publish(
    topicArn: string,
    message: string,
    attributes?: Record<string, string>,
  ): Promise<string>;

  createTopic(name: string): Promise<string>;
}