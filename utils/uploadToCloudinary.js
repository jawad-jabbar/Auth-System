const cloudinary = require('../config/cloudinary')

const uploadToCloudinary = async (buffer, folder) => {
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
  
  module.exports = uploadToCloudinary;