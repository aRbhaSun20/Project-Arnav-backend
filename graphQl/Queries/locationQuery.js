const { GraphQLNonNull, GraphQLString, GraphQLList } = require("graphql");
const Location = require("../../models/Location");
const { LocationType } = require("../Schemas/LocationSchema");

const locationQuery = {
  location: {
    type: LocationType,
    description: "single location ",
    args: {
      _id: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args) => {
      return Location.findOne({ _id: args._id });
    },
  },
  locations: {
    type: GraphQLList(LocationType),
    description: "list of locations",
    resolve: async () => {
      return await Location.find();
    },
  },
};

module.exports = { locationQuery };
