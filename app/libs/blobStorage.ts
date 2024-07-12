import { S3Client } from "@aws-sdk/client-s3";
const { Upload } = require("@aws-sdk/lib-storage");

const s3Client = new S3Client({ region: "ap-south-1" });

const uploadFile = async (file: any, fileName: string, container: string) => {
    try {
        const uploadParams = {
            Bucket: "instagram-clone01",
            Key: `posts/${fileName}`, // The name of the file in S3
            Body: file,
        };

        const upload = new Upload({
            client: s3Client,
            params: uploadParams,
            leavePartsOnError: false, // Clean up any parts if the upload fails
        });

        await upload.done();
    } catch (error) {
        console.log(error);
    }
};

export default uploadFile;
