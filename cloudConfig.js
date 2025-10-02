const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary");
cloudinary.config({ 
        cloud_name: 'dh6bbzb1w', 
        api_key: '389235365636855',
        api_secret: 'gSEw1s6RwfHzKEUnDVQI0cxbHL4',
    });

const storage = new CloudinaryStorage({
    cloudinary : cloudinary,
    params : {
        folder : 'wanderlust_DEV',
        allowedFormats : ["png","jpeg","jpg"],
    },
});

module.exports = {
    cloudinary,
    storage,
};

