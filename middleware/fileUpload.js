const multer = require('multer');
// Create a storage instance for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Specify the destination directory
        const uploadPath = './uploads'; // Change this to your desired directory
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // Set the file name
        cb(null, file.originalname);
    }
});

// Create the Multer instance
const upload = multer({ storage: storage });

module.exports = upload;
