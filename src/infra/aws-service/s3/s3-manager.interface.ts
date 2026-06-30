import { Buffer } from "buffer";

export interface IS3Manager {
  uploadFile(bucket: string, key: string, body: Buffer | Uint8Array | string, contentType?: string,): Promise<void>;
  downloadFile(bucket: string, key: string,): Promise<Buffer>;
  deleteFile(bucket: string, key: string,): Promise<void>;
  fileExists(bucket: string, key: string,): Promise<boolean>;
  getSignedUrl(bucket: string, key: string, expiresIn?: number,): Promise<string>;
}