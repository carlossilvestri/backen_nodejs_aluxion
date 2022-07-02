import dotenv from "dotenv"
import AWS from "aws-sdk"
import S3 from "aws-sdk/clients/s3"
import fs from "fs"
import util from "util"
import multer from "multer"
import { ImageAWSRepository } from "../../../../shared/global/domain/repositories"
dotenv.config()

export class AWSImageClass implements ImageAWSRepository {
    // VARIABLES
    private region: string = "us-east-2"
    private accessKeyId: string = String(process.env.AWS_KEY)
    private secretAccessKey: string = String(process.env.AWS_SECRET)
    private bucketName: string = String(process.env.AWS_BUCKET)
    private storage: AWS.S3 = new S3({
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
    })
    private static hashPasswordInstance: AWSImageClass

    constructor() {}

    /**
     * getAuthJWTClassMiddleware()
     * @returns AWSImageClass
     */
    public static getAWSImageClassInstance(): AWSImageClass {
        if (!AWSImageClass.hashPasswordInstance) {
            AWSImageClass.hashPasswordInstance = new AWSImageClass()
        }
        return AWSImageClass.hashPasswordInstance
    }
    /**
     *
     * @returns
     */
    public getBuckets = () => {
        return this.storage.listBuckets().promise()
    }
    /**
     *
     * @param bucketName
     * @param file
     * @returns
     */
    public uploadFile = (file: any): Promise<S3.ManagedUpload.SendData> => {
        const stream = fs.createReadStream(file.tempFilePath)
        const params = {
            Bucket: this.bucketName,
            Key: file.name,
            Body: stream,
        }
        return this.storage.upload(params).promise()
    }

    public getFileStream(fileKey: any) {
        const downloadParams = {
            Key: fileKey,
            Bucket: this.bucketName,
        }

        return this.storage.getObject(downloadParams).createReadStream()
    }

    public unlinkFile = util.promisify(fs.unlink)
}
