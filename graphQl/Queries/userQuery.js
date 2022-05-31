const { GraphQLNonNull, GraphQLString, GraphQLList } = require("graphql");
const Users = require("../../models/Users");
const { userType } = require("../Schemas/UserSchema");
const { ObjectId } = require("mongodb");

const userQuery = {
  user: {
    type: userType,
    description: "login user",
    args: {
      _id: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args) => {
      return await Users.findById(args._id);
    },
  },
  users: {
    type: GraphQLList(userType),
    description: "list of users",
    resolve: async () => {
      return await Users.find();
    },
  },
};

module.exports = { userQuery };
