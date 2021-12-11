const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLInt,
} = require("graphql");
const Users = require("../models/Users");
const { userType, userSchema, userOptionalSchema } = require("./UserQuery");

const RootMutationType = new GraphQLObjectType({
  name: "Mutations",
  description: "Root Mutations",
  fields: () => ({
    addUser: {
      type: userType,
      description: "Add New User",
      args: {
        ...userSchema,
      },
      resolve: async (parent, args) => {
        const user = new Users({ ...args });
        return await user.save();
        // return book;
      },
    },
    editUser: {
      type: userType,
      description: "Edit User",
      args: {
        ...userOptionalSchema,
      },
      resolve: async (parent, args) => {
        const { _id, ...remaining } = args;
        return await Users.findOneAndUpdate(
          { _id },
          { $set: { ...remaining } },
          { new: true }
        );
      },
    },
    deleteUser: {
      type: userType,
      description: "Delete User",
      args: {
        _id: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        return await Users.findOneAndRemove({ _id: args._id });
      },
    },
  }),
});

module.exports = RootMutationType;
