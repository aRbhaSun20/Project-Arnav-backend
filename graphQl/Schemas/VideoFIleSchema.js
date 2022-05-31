const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} = require("graphql");

const videoFileSchema = {
  _id: {
    type: GraphQLString,
  },
  length: {
    type: GraphQLInt,
    description: "length for video",
  },
  chunkSize: {
    type: GraphQLInt,
    description: "Created User At",
  },
  uploadDate: {
    type: GraphQLString,
    description: "Upload date",
  },
  filename: {
    type: GraphQLString,
    description: "videos Name",
  },
  contentType: {
    type: GraphQLString,
    description: "videos Name",
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

const videoFileType = new GraphQLObjectType({
  name: "Video_files",
  description: "Video Files",
  fields: () => ({ ...videoFileSchema }),
});

module.exports = { videoFileSchema, videoFileType };
