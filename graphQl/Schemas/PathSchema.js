const { GraphQLObjectType, GraphQLList, GraphQLString } = require("graphql");
const Node = require("../../models/Node");
const { getIndiNode } = require("../Queries/nodeQuery");
// const { LocationType } = require("./LocationSchema");
const { NodeType } = require("./NodeSchema");

const PathSchema = {
  neighborsData: {
    type: GraphQLList(NodeType),
    description: "neighbor nodes",
    resolve: async (path) => {
      if (path.neighbors.length)
        return await path.neighbors.map(async (ele) => await getIndiNode(ele));
    },
  },
  sourceData: {
    type: NodeType,
    description: "source node",
    resolve: async (path) => {
      return await getIndiNode(path._id);
    },
  },
  neighbors: {
    type: GraphQLList(GraphQLString),
    description: "neighbor nodes",
  },
  source: {
    type: GraphQLString,
    description: "source node",
    resolve: (path) => path._id,
  },
};

const PathType = new GraphQLObjectType({
  name: "Path",
  description: "Paths",
  fields: () => ({ ...PathSchema }),
});

module.exports = { PathType, PathSchema };
