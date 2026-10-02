import ImageKit, {toFile} from "@imagekit/nodejs"
import { config } from "../config/config.js"

const client = new ImageKit({
    privateKey: config.IMAGEKIT_PRIVATE_KEY
})

export const uploadFile = async ({ buffer, fileName }) => {
    const response = await client.files.upload({
        file: await toFile(buffer),
        fileName: fileName,
        folder: "CRUD"
    })
    return response;
}

export const deleteFile = async (fileId) => {
    return await client.files.delete(fileId);
}