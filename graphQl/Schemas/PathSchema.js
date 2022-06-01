const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} = require("graphql");
const Node = require("../../models/Node");
// const { LocationType } = require("./LocationSchema");
const { NodeType } = require("./NodeSchema");

const PathSchema = {
  parentId: {
    type: GraphQLNonNull(GraphQLString),
    description: "parent id for the node",
  },
  paths: {
    type: GraphQLList(NodeType),
    description: "Path to location",
  },
};

const PathType = new GraphQLObjectType({
  name: "Path",
  description: "Paths",
  fields: () => ({ ...PathSchema }),
});

module.exports = { PathType, PathSchema };
