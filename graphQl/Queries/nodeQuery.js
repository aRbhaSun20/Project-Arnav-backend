const { GraphQLNonNull, GraphQLString, GraphQLList } = require("graphql");
const {
  cacheManagement,
  saveMultiple,
} = require("../../middlewares/CacheModule");
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
      return await getIndiNode(args._id);
    },
  },
  nodes: {
    type: new GraphQLList(NodeType),
    description: "list of nodes",
    resolve: async (parent, args) => {
      return await getAllNodes();
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

const getAllNodes = async () => {
  if (cacheManagement.has("nodeAll")) {
    const data = cacheManagement.get("nodeAll");
    if (data) {
      console.log("cache nodes")
      return JSON.parse(data);
    }
  }
  const datas = await Node.find();
  saveMultiple(datas, "nodeAll");
  return datas;
};

const getIndiNode = async (sourceId) => {
  if (cacheManagement.has(sourceId)) {
    console.log("node cache");
    return cacheManagement.get(sourceId);
  } else {
    const data = await Node.findById(sourceId);
    cacheManagement.set(sourceId, data);
    return data;
  }
};

module.exports = { nodesQuery, getAllNodes, getIndiNode };
