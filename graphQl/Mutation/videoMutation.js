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

    },
  },
};

module.exports = { videoMutation };
