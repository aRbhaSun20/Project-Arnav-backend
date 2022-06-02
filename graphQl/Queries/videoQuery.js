const { GraphQLList, GraphQLNonNull, GraphQLString } = require("graphql");
const { getAllVideoData } = require("../../middlewares/databaseConnection");
const Video = require("../../models/Video");
const { videoType } = require("../Schemas/VideoSchema");

const videoQuery = {
  video: {
    type: videoType,
    description: "video for location",
    args: {
      _id: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args) => {
      return await Video.findOne({ _id: args._id });
    },
  },
  videos: {
    type: GraphQLList(videoType),
    description: "list of videos for location",
    resolve: async () => {
      return await getAllVideoData();
    },
  },
};

module.exports = { videoQuery };
