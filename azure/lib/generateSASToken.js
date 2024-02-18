const {
  BlobServiceClient,
  StorageSharedKeyCredential,
  BlobSASPermissions,
  generateBlobSASQueryParameters,
} = require("@azure/storage-blob");

const accountName = process.env.accountName;
const accountKey = process.env.accountKey;
const containerName = "images";

const sharedKeyCredential = new StorageSharedKeyCredential(
  accountName,
  accountKey
);

const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.name`,
  sharedKeyCredential
);

async function generateSASToken() {
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const permission = new BlobSASPermissions();
  permission.write = true;
  permission.create = true;
  permission.read = true;

  const expiryDate = new Date();
  expiryDate.setMinutes(expiryDate.getMinutes() + 30);

  const sasToken = generateBlobSASQueryParameters(
    {
      containerName: containerClient.containerName,
      permissions: permission.toString(),
      expiresOn: expiryDate,
    },
    sharedKeyCredential
  ).toString();

  return sasToken;
}

module.exports = generateSASToken;
