const { GraphQLNonNull, GraphQLString, GraphQLList } = require("graphql");
const Location = require("../../models/Location");
const { NodeType } = require("../Schemas/NodeSchema");

const nodesQuery = {
  node: {
    type: NodeType,
    description: "individual node",
    args: {
      _id: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args) => {
      return Location.findById(args._id);
    },
  },
  nodes: {
    type: NodeType,
    description: "list of nodes",
    resolve: async (parent, args) => {
      return Location.find();
    },
  },
};

module.exports = { nodesQuery };
