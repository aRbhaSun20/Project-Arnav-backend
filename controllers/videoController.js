const {
  getAllVideoData,
  getIndividualVideoData,
} = require("../middlewares/databaseConnection");

const UploadMiddleWare = async (req, res) => {
  console.log(res.req.file);
  res.status(200).json({
    message: "success",
  });
};

const GetAllVideosMiddleWare = async (req, res) => {
  const data = await getAllVideoData();
  res.json(data);
};

const GetIndividualMiddleWare = async (req, res) => {
  return await getIndividualVideoData(req.query.videoId, res);
};

module.exports = {
  UploadMiddleWare,
  GetAllVideosMiddleWare,
  GetIndividualMiddleWare,
};
