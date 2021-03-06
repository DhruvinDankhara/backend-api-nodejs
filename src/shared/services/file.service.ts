import { Injectable, Scope } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ConfigService } from 'src/config/config.service';

@Injectable({ scope: Scope.DEFAULT })
export class FileService {
  bucketName: string;
  presignExpireSeconds: number;
  storageService: S3;

  constructor(private readonly config: ConfigService) {
    const awsConfig = config.get('aws');
    this.bucketName = this.config.get('awsBucket');
    this.presignExpireSeconds = this.config.get('presignedUrlExpireTime');
    this.storageService = new S3({
      ...awsConfig,
      signatureVersion: 'v4',
    });
  }
}
