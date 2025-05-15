import { Injectable, Logger } from '@nestjs/common';
import { Express } from 'express';
import {
    S3Client,
    PutObjectCommand,
    PutObjectCommandInput,
    PutObjectCommandOutput
} from '@aws-sdk/client-s3'
import { ConfigService } from '@nestjs/config';


@Injectable()
export class S3Service {
  private logger = new Logger(S3Service.name)
    private region: string;
    private accessKey: string;
    private accessSecretKey: string;
    private s3: S3Client;

    constructor(private configService: ConfigService){
        this.region = this.configService.get<string>('S3_REGION') as string;
        this.accessKey = this.configService.get<string>('S3_ACCESS_KEY') as string;
        this.accessSecretKey = this.configService.get<string>('S3_ACCESS_SECRET') as string;
        this.s3 = new S3Client({
            region: this.region,
            credentials: {
                accessKeyId: this.accessKey,
                secretAccessKey: this.accessSecretKey
            }
        })
    }
    async uploadFile(file:Express.Multer.File, key:string){
        const bucket = this.configService.get<string>('S3_BUCKET_NAME')

        const input: PutObjectCommandInput = {
            Body: file.buffer,
            Bucket: bucket,
            Key: key,
            ContentType: file.mimetype,
            ACL: 'public-read'
        };
        try {
            const response: PutObjectCommandOutput = await this.s3.send(
                new PutObjectCommand(input),
            );
            if(response.$metadata.httpStatusCode === 200){
                return `https://${bucket}.s3.${this.region}.amazonaws.com/${key}`;
            };
            throw new Error(`Image not saved to S3`)
        } catch (error) {
            this.logger.error('Cannot save file inside S3', error)
            throw error
        }
    }
}
