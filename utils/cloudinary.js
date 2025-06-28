const cloudinary = require('cloudinary').v2;
const fs = require('fs');


 


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_COLUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const res = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        });
        fs.unlinkSync(localFilePath);
        return res.url;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        console.log(error?.message);
        throw error
    }
};

module.exports = {
    uploadOnCloudinary
};