const Nodes = require("../../models/Node");
const { GraphQLNonNull, GraphQLString } = require("graphql");
const { NodeType, NodeSchema, nodeOptionalSchema } = require("../Schemas/NodeSchema");
require("dotenv").config();

const nodesMutation = {
  addNodes: {
    type: NodeType,
    description: "Add New Nodes",
    args: {
      ...nodeOptionalSchema,
    },
    resolve: async (parent, args) => {
      const node = new Nodes({ ...args });
      return await node.save();
    },
  },
  editNodes: {
    type: NodeType,
    description: "Edit Nodes",
    args: {
      ...nodeOptionalSchema,
    },
    resolve: async (parent, args) => {
      const { _id, ...remaining } = args;
      return await Nodes.findOneAndUpdate(
        { _id },
        { $set: { ...remaining } },
        { new: true }
      );
    },
  },
  deleteNodes: {
    type: NodeType,
    description: "Delete Nodes",
    args: {
      _id: {
        type: GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (parent, args) => {
      return await Nodes.findOneAndRemove({ _id: args._id });
    },
  },
};

module.exports = { nodesMutation };
