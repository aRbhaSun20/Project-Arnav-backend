const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLList,
} = require("graphql");
const { userType } = require("./UserSchema");
const Users = require("../../models/Users");

const LocationSchema = {
  _id: {
    type: GraphQLString,
  },
  placeName: {
    type: GraphQLNonNull(GraphQLString),
    description: "Name of place",
  },
  coordinates: {
    type: GraphQLNonNull(GraphQLList(GraphQLFloat)),
    description: "Coordinates of location",
  },
  userId: {
    type: GraphQLNonNull(GraphQLString),
    description: "Associated User Created",
  },
  user: {
    type: userType,
    description: "Associated User Created",
    resolve: (user) => {
      return Users.findById(user.userId);
    },
  },
};

const locationOptionalSchema = {
  _id: {
    type: GraphQLString,
  },
  placeName: {
    type: GraphQLString,
    description: "Name of place",
  },
  coordinates: {
    type: GraphQLList(GraphQLFloat),
    description: "Coordinates of location",
  },
  userId: {
    type: GraphQLString,
    description: "Associated User Created",
  },
};

const LocationType = new GraphQLObjectType({
  name: "Location",
  description: "Locations",
  fields: () => ({ ...LocationSchema }),
});

module.exports = { LocationType, LocationSchema, locationOptionalSchema };
