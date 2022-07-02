import S3 from "aws-sdk/clients/s3"
import fs from "fs"

export interface ImageAWSRepository {
    uploadFile: (file: any) => Promise<S3.ManagedUpload.SendData>
    getBuckets: () => Promise<any>
    getFileStream(fileKey: any): any
    unlinkFile: (path: fs.PathLike) => Promise<void>
}