const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLList,
} = require("graphql");
const { userType } = require("./UserSchema");
const Users = require("../../models/Users");
const { parentLocationType } = require("./parentLocationSchema");
const Parent = require("../../models/Parent");
const { cacheManagement } = require("../../middlewares/CacheModule");

const NodeSchema = {
  _id: {
    type: GraphQLString,
  },
  placeName: {
    type: GraphQLString,
    description: "Name of place",
  },
  coordinates: {
    type: GraphQLList(GraphQLFloat),
    description: "Coordinates of location",
  },
  userId: {
    type: GraphQLNonNull(GraphQLString),
    description: "Associated User Created",
  },
  user: {
    type: userType,
    description: "Associated User Created",
    resolve: async (user) => {
      if (cacheManagement.has(user.userId)) {
        return cacheManagement.get(user.userId);
      } else {
        const data = await Users.findById(user.userId);
        cacheManagement.set(user.userId, data);
        return data;
      }
    },
  },
  imageUrl: {
    type: GraphQLString,
    description: "image of parent location",
  },
  fileName: {
    type: GraphQLString,
    description: "File Name",
  },
  parentId: {
    type: GraphQLString,
    description: "parent id for the node",
  },
  parent: {
    type: parentLocationType,
    description: "Parent Node",
    resolve: async (location) => {
      if (cacheManagement.has(location.parentId)) {
        return cacheManagement.get(location.parentId);
      } else {
        const data = await Parent.findById(location.parentId);
        cacheManagement.set(location.parentId, data);
        return data;
      }
    },
  },
};

const nodeOptionalSchema = {
  _id: {
    type: GraphQLString,
  },
  placeName: {
    type: GraphQLString,
    description: "Name of place",
  },
  coordinates: {
    type: GraphQLList(GraphQLFloat),
    description: "Coordinates of location",
  },
  userId: {
    type: GraphQLString,
    description: "Associated User Created",
  },
  imageUrl: {
    type: GraphQLString,
    description: "image of parent location",
  },
  parentId: {
    type: GraphQLString,
    description: "parent id for the node",
  },
  fileName: {
    type: GraphQLString,
    description: "File Name",
  },
};

const NodeType = new GraphQLObjectType({
  name: "Nodes",
  description: "Nodes",
  fields: () => ({ ...NodeSchema }),
});

module.exports = { NodeType, NodeSchema, nodeOptionalSchema };
