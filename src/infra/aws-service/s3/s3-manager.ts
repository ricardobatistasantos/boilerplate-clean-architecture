import { Injectable } from '@nestjs/common';

import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
} from '@aws-sdk/client-s3';

import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { IS3Manager } from './s3-manager.interface';
import { Buffer } from 'buffer';
export const S3_ADAPTER_TOKEN = 'S3_ADAPTER_TOKEN';

@Injectable()
export class S3Manager implements IS3Manager {
  private readonly client: S3Client;

  constructor() {

    this.client = new S3Client({
      region: process.env.AWS_REGION || 'us-east-1',
    });
  }

  async uploadFile(
    bucket: string,
    key: string,
    body: Buffer | Uint8Array | string,
    contentType?: string,
  ): Promise<void> {
    await this.client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: body,
        ContentType: contentType,
      }),
    );
  }

  async downloadFile(
    bucket: string,
    key: string,
  ): Promise<Buffer> {
    const result = await this.client.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: key,
      }),
    );

    const chunks: Buffer[] = [];

    for await (const chunk of result.Body as any) {
      chunks.push(Buffer.from(chunk));
    }

    return Buffer.concat(chunks);
  }

  async deleteFile(
    bucket: string,
    key: string,
  ): Promise<void> {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: key,
      }),
    );
  }

  async fileExists(
    bucket: string,
    key: string,
  ): Promise<boolean> {
    try {
      await this.client.send(
        new HeadObjectCommand({
          Bucket: bucket,
          Key: key,
        }),
      );

      return true;
    } catch {
      return false;
    }
  }

  async getSignedUrl(
    bucket: string,
    key: string,
    expiresIn = 3600,
  ): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    return getSignedUrl(
      this.client,
      command,
      { expiresIn },
    );
  }
}