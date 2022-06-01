const { GraphQLNonNull, GraphQLString, GraphQLList } = require("graphql");
const Location = require("../../models/Location");
const Parent = require("../../models/Parent");
const { LocationType } = require("../Schemas/LocationSchema");
const { parentLocationType } = require("../Schemas/parentLocationSchema");

const parentLocationQuery = {
  parent: {
    type: parentLocationType,
    description: "single parent location ",
    args: {
      _id: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args) => {
      return Parent.findOne({ _id: args._id });
    },
  },
  parents: {
    type: GraphQLList(parentLocationType),
    description: "list of parent locations",
    resolve: async () => {
      return await Parent.find();
    },
  },
};

module.exports = { parentLocationQuery };
