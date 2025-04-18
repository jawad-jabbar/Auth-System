const cloudinary = require('../config/cloudinary');

const uploadBufferToCloudinary = async (buffer, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    ).end(buffer);
  });
};

const uploadFileToCloudinary = async (filePath, folder) => {
  try {
    const result = await cloudinary.v2.uploader.upload(filePath, { folder });
    return result.secure_url;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  uploadBufferToCloudinary,
  uploadFileToCloudinary
};
