const { GraphQLNonNull, GraphQLString, GraphQLList } = require("graphql");
const Users = require("../../models/Users");
const { userType } = require("../Schemas/UserSchema");

const userQuery = {
  user: {
    type: userType,
    description: "login user",
    args: {
      _id: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args) => {
      return Users.findOne({ _id: args._id });
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
