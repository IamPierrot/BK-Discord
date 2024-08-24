import fs from 'fs';
import path from 'path';
import axios from 'axios';
import mime from 'mime-types';

const attachmentDir = path.join(__dirname, 'attachments');

if (!fs.existsSync(attachmentDir)) {
    fs.mkdirSync(attachmentDir, { recursive: true });
}

export const saveAttachment = async (messageId: string, url: string, contentType: string) => {
    // Sử dụng MIME type để xác định phần mở rộng của tệp
    const extension = mime.extension(contentType) || 'bin'; 
    const fileName = `${messageId}.${extension}`;
    const filePath = path.join(attachmentDir, fileName);

    try {
        const response = await axios({
            method: 'get',
            url: url,
            responseType: 'stream'
        });

        response.data.pipe(fs.createWriteStream(filePath));

        return new Promise<string>((resolve, reject) => {
            response.data.on('end', () => resolve(filePath));
            response.data.on('error', reject);
        });
    } catch (error) {
        console.error('Error saving attachment:', error);
        throw error;
    }
};

export const getAttachmentPath = (messageId: string, contentType: string) => {
    const extension = mime.extension(contentType) || 'bin';
    const fileName = `${messageId}.${extension}`;
    return path.join(attachmentDir, fileName);
};

export const deleteAttachment = (messageId: string, contentType: string) => {
    const filePath = getAttachmentPath(messageId, contentType);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
};
