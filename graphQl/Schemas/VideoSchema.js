const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLFloat,
} = require("graphql");
const { GraphQLUpload } = require("graphql-upload");

const videoSchema = {
  _id: {
    type: GraphQLString,
  },
  start: {
    type: GraphQLString,
    description: "start",
  },
  destination: {
    type: GraphQLString,
    description: "Destination",
  },
  user_id: {
    type: GraphQLString,
    description: "User ID",
  },
  video_id: {
    type: GraphQLString,
    description: "videos ID",
  },
};

// const videoOptionalSchema = {
//   _id: {
//     type: GraphQLString,
//   },
//   name: {
//     type: GraphQLString,
//     description: "Name for video",
//   },
//   createdAt: {
//     type: GraphQLString,
//     description: "Created User At",
//   },
//   location: {
//     type: GraphQLList(GraphQLString),
//     description: "Location of User",
//   },
//   video: {
//     type: GraphQLUpload,
//     description: "videos location",
//   },
// };

const videoType = new GraphQLObjectType({
  name: "Videos",
  description: "Videos ",
  fields: () => ({ ...videoSchema }),
});

module.exports = { videoSchema, videoType };
