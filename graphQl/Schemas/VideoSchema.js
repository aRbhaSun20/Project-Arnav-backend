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
  name: {
    type: GraphQLNonNull(GraphQLString),
    description: "Name for video",
  },
  createdAt: {
    type: GraphQLString,
    description: "Created User At",
  },
  location: {
    type: GraphQLNonNull(GraphQLList(GraphQLString)),
    description: "Location of User",
  },
  video: {
    type: GraphQLNonNull(GraphQLUpload),
    description: "videos location",
  },
};

const videoOptionalSchema = {
  _id: {
    type: GraphQLString,
  },
  name: {
    type: GraphQLString,
    description: "Name for video",
  },
  createdAt: {
    type: GraphQLString,
    description: "Created User At",
  },
  location: {
    type: GraphQLList(GraphQLString),
    description: "Location of User",
  },
  video: {
    type: GraphQLUpload,
    description: "videos location",
  },
};

const videoType = new GraphQLObjectType({
  name: "Videos",
  description: "Videos ",
  fields: () => ({ ...videoSchema }),
});

module.exports = { videoSchema, videoOptionalSchema, videoType };
