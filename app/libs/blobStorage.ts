import { StorageSharedKeyCredential, BlobServiceClient } from "@azure/storage-blob";

const account=process.env.AZURE_STORAGE_ACCOUNT_NAME as string;
const accountKey=process.env.AZURE_STORAGE_ACCOUNT_KEY as string;
const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

const blobServiceClient = new BlobServiceClient(
`https://${account}.blob.core.windows.net`,
sharedKeyCredential
);

const uploadFile = async(file: any,fileName: string,container: string) => {
    try {
        const containerClient = blobServiceClient.getContainerClient(container);
        const blockBlobClient =  containerClient.getBlockBlobClient(fileName);
        await blockBlobClient.uploadStream(file);
        
    } catch (error) {
        console.log(error);
    }
}

export default uploadFile;



