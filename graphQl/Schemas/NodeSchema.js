const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLList,
} = require("graphql");
const { userType } = require("./UserSchema");
const Users = require("../../models/Users");
const Location = require("../../models/Location");
const { parentLocationType } = require("./parentLocationSchema");
const Parent = require("../../models/Parent");

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
    resolve: (user) => {
      return Users.findById(user.userId);
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
  // parentId: {
  //   type: GraphQLString,
  //   description: "parent id for the node",
  // },
  // parent: {
  //   type: parentLocationType,
  //   description: "Parent Node",
  //   resolve: (location) => {
  //     return Parent.findById(location.parentId);
  //   },
  // },
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
  fileName: {
    type: GraphQLString,
    description: "File Name",
  },
  // parentId: {
  //   type: GraphQLString,
  //   description: "parent id for the node",
  // },
};

const NodeType = new GraphQLObjectType({
  name: "Nodes",
  description: "Nodes",
  fields: () => ({ ...NodeSchema }),
});

module.exports = { NodeType, NodeSchema, nodeOptionalSchema };
