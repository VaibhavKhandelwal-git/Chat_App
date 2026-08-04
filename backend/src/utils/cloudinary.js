import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const getCloudinary = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    return cloudinary;
};

const uploadToCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        console.log("Cloudinary config:", {
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            hasSecret: !!process.env.CLOUDINARY_API_SECRET,
        });
        console.log("Uploading file:", localFilePath);
        const response = await getCloudinary().uploader.upload(localFilePath, {
            resource_type: "auto",
        });
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        console.error("Cloudinary upload error:", error.message);
        if (localFilePath && fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return null;
    }
};

const deleteFromCloudinary = async (publicId, resource_type = "image") => {
    try {
        if (!publicId) return null;
        return await getCloudinary().uploader.destroy(publicId, { resource_type });
    } catch (error) {
        return null;
    }
};

export { deleteFromCloudinary };
export default uploadToCloudinary;
