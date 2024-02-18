const { app } = require("@azure/functions");
const axios = require("axios");
const openai = require("../../lib/openai");
const generateSASToken = require("../../lib/generateSASToken");
const { BlobServiceClient } = require("@azure/storage-blob");

const accountName = process.env.accountName;

const containerName = "images";

app.http("generateImage", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request) => {
    const { prompt } = await request.json();

    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
    });

    const image_url = response.data[0].url;

    const res = await axios.get(image_url, { responseType: "arraybuffer" });
    const arraybuffer = res.data;

    const sasToken = await generateSASToken();

    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net?${sasToken}`
    );

    const containerClient = blobServiceClient.getContainerClient(containerName);

    const timeStamp = new Date().getTime();
    const file_name = `${prompt}_${timeStamp}.png`;

    const blockBlobClient = containerClient.getBlockBlobClient(file_name);

    try {
      await blockBlobClient.uploadData(arraybuffer);
      console.log("Uploaded");
    } catch (err) {
      console.error("Error:", err);
    }

    return { body: "Successfully Uploaded Image" };
  },
});
