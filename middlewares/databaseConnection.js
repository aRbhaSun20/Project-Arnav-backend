const mongoose = require("mongoose");
require("dotenv").config();
const crypto = require("crypto");
const path = require("path");

const Grid = require("gridfs-stream");
const { GridFsStorage } = require("multer-gridfs-storage");

let gfs, gridfsBucket;

mongoose
  .connect(process.env.MONGODBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("connected to db");
  })
  .catch((e) => console.log(e));

const connection = mongoose.connection;

if (connection) {
  connection.once("open", () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(connection.db, {
      bucketName: "uploads",
    });
    gfs = Grid(connection.db, mongoose.mongo);
    gfs.collection("uploads");
  });
}

const getAllVideoData = async () => {
  const data = await gfs.files.find().toArray();
  return data;
};

const getIndividualVideoData = async (filename, res) => {
  gfs.files.findOne(
    {
      filename,
    },
    (err, file) => {
      try {
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
      } catch {
        res.status(404).json({ message: "file not found" });
      }
    }
  );
};

const storage = new GridFsStorage({
  url: process.env.MONGODBURL,
  file: (req, file) => {
    console.log("File Saved Successfully", JSON.parse(req.query.location));
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
          metadata: { locationName: req.query.location },
        };
        resolve(fileInfo);
      });
    });
  },
});

module.exports = { getAllVideoData, storage, getIndividualVideoData };
