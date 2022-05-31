const {
  videoFileType,
  videoFileSchema,
} = require("../Schemas/VideoFIleSchema");

const multer = require("multer");
const { gfs, storage } = require("../../middlewares/databaseConnection");
require("dotenv").config();

const videoMutation = {
  uploadVideo: {
    description: "Uploads a video.",
    type: videoFileType,
    args: {
      ...videoFileSchema,
    },
    resolve: async (parent, file) => {
      const upload = multer({ storage }).single("file");
      console.log(file);

      // const { filename, mimetype, createReadStream } = await image;
      // const stream = createReadStream();
      // // Promisify the stream and store the file, then…
      return file;
    },
  },
};

module.exports = { videoMutation };
