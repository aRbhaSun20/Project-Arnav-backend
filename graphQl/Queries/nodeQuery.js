const { GraphQLNonNull, GraphQLString, GraphQLList } = require("graphql");
const Node = require("../../models/Node");
const { NodeType } = require("../Schemas/NodeSchema");

const nodesQuery = {
  node: {
    type: NodeType,
    description: "individual node",
    args: {
      _id: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args) => {
      return Node.findById(args._id);
    },
  },
  nodes: {
    type: new GraphQLList(NodeType),
    description: "list of nodes",
    resolve: async (parent, args) => {
      return await Node.find();
    },
  },
};

module.exports = { nodesQuery };
