const { GraphQLList, GraphQLNonNull, GraphQLString } = require("graphql");
const Location = require("../../models/Location");
const Video = require("../../models/Video");
const { videoType } = require("../Schemas/VideoSchema");

const videoQuery = {
  video: {
    type: videoType,
    description: "video for location",
    args: {
      destination: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args) => {
      const locationData = await Location.findOne({
        placeName: args.destination,
      });
      const locationID = locationData.id.valueOf();
      return await Video.findOne({ destination: locationID });
    },
  },
  videos: {
    type: GraphQLList(videoType),
    description: "list of videos for location",
    resolve: async () => {
      return await Video.find();
    },
  },
};

module.exports = { videoQuery };
