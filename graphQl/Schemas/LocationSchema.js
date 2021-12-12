const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLList,
} = require("graphql");
const { userType } = require("./UserSchema");

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
};

const locationOptionalSchema = {
  _id: {
    type: GraphQLNonNull(GraphQLString),
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
    type: userType,
    description: "Associated User Created",
  },
};

const LocationType = new GraphQLObjectType({
  name: "Location",
  description: "Locations List",
  fields: () => ({ ...LocationSchema }),
});

module.exports = { LocationType, LocationSchema, locationOptionalSchema };
