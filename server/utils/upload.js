import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage'; // Correctly import the default export
import dotenv from 'dotenv';

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
    url: `mongodb+srv://${username}:${password}@cluster0.ey8pa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        // Check if the file type is not in the allowed list
        if (match.indexOf(file.mimetype) === -1) {
            return `${Date.now()}-blog-${file.originalname}`; // Return a default filename
        }

        return {
            bucketName: "photos", // Specify the bucket name
            filename: `${Date.now()}-blog-${file.originalname}` // Create a unique filename
        };
    }
});

// Export the multer instance configured with the storage
export default multer({ storage });
