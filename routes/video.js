const { Router } = require("express");
const {
  UploadMiddleWare,
  GetAllVideosMiddleWare,
  GetIndividualMiddleWare,
} = require("../controllers/videoController");

const multer = require("multer");
const { storage } = require("../middlewares/databaseConnection");

const videoRouter = Router();

const upload = multer({ storage });

videoRouter.post("/upload", upload.single("file"), UploadMiddleWare);
videoRouter.get("/getFiles", GetAllVideosMiddleWare);
videoRouter.get("/getVideo", GetIndividualMiddleWare);

module.exports = videoRouter;
