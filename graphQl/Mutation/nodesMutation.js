const Nodes = require("../../models/Node");
const { GraphQLNonNull, GraphQLString } = require("graphql");
const { NodeType, nodeOptionalSchema } = require("../Schemas/NodeSchema");
const { cacheManagement, setKey } = require("../../middlewares/CacheModule");
require("dotenv").config();

const nodesMutation = {
  addNodes: {
    type: NodeType,
    description: "Add New Nodes",
    args: {
      ...nodeOptionalSchema,
    },
    resolve: async (parent, args) => {
      const node = await new Nodes({ ...args }).save();
      if (cacheManagement.has("nodeAll")) cacheManagement.del("nodeAll");
      cacheManagement.set(setKey(node._id), node);
      return node;
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
      const data = await Nodes.findOneAndUpdate(
        { _id },
        { $set: { ...remaining } },
        { new: true }
      );
      if (cacheManagement.has("nodeAll")) cacheManagement.del("nodeAll");
      cacheManagement.set(setKey(data._id), data);
      return data;
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
      if (cacheManagement.has(args._id)) cacheManagement.del(args._id);
      if (cacheManagement.has("nodeAll")) cacheManagement.del("nodeAll");
      return await Nodes.findOneAndRemove({ _id: args._id });
    },
  },
};

module.exports = { nodesMutation };
