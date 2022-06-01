const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLFloat,
} = require("graphql");
const { userType } = require("./UserSchema");
const Users = require("../../models/Users");
const Location = require("../../models/Location");
const { LocationType } = require("./LocationSchema");

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
  sourceId: {
    type: GraphQLString,
    description: "video Location source id",
  },
  source: {
    type: LocationType,
    description: "video Location source",
    resolve: (location) => {
      return Location.findById(location.sourceId);
    },
  },
  destinationId: {
    type: GraphQLString,
    description: "video Location destination id",
  },
  destination: {
    type: LocationType,
    description: "video Location destination",
    resolve: (location) => {
      return Location.findById(location.destinationId);
    },
  },
  userId: {
    type: GraphQLNonNull(GraphQLString),
    description: "Associated User id Created",
  },
  user: {
    type: userType,
    description: "Associated User Created",
    resolve: (user) => {
      return Users.findById(user.userId);
    },
  },

  videoUrl: {
    type: GraphQLNonNull(GraphQLString),
    description: "videos url",
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
  source: {
    type: LocationType,
    description: "video Location source",
    resolve: (location) => {
      return Location.findById(user.userId);
    },
  },
  destination: {
    type: LocationType,
    description: "video Location destination",
    resolve: (location) => {
      return Location.findById(user.userId);
    },
  },
  user: {
    type: userType,
    description: "Associated User Created",
    resolve: (user) => {
      return Users.findById(user.userId);
    },
  },
  videoUrl: {
    type: GraphQLNonNull(GraphQLString),
    description: "videos url",
  },
};

const videoType = new GraphQLObjectType({
  name: "Videos",
  description: "Videos ",
  fields: () => ({ ...videoSchema }),
});

module.exports = { videoSchema, videoOptionalSchema, videoType };
