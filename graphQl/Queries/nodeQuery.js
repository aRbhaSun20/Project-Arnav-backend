const { GraphQLNonNull, GraphQLString, GraphQLList } = require("graphql");
const { cacheManagement } = require("../../middlewares/CacheModule");
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
      if (cacheManagement.has(args._id)) {
        console.log("cache");
        return cacheManagement.get(args._id);
      } else {
        const data = await Node.findById(args._id);
        cacheManagement.set(args._id, data);
        return data;
      }
    },
  },
  nodes: {
    type: new GraphQLList(NodeType),
    description: "list of nodes",
    resolve: async (parent, args) => {
      const datas = await Node.find();
      datas.forEach((ele) => {
        cacheManagement.set(ele._id, ele);
      });
      return datas;
    },
  },
  getParentNodes: {
    type: new GraphQLList(NodeType),
    description: "list of parent nodes",
    args: {
      parentId: { type: GraphQLNonNull(GraphQLString) },
      sourceId: { type: GraphQLString },
    },
    resolve: async (parent, args) => {
      return await Node.find({ parentId: args.parentId });
    },
  },
};

module.exports = { nodesQuery };
