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

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

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
        user: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        return await Users.findOneAndRemove({ _id: args._id });
      },
    },
    login: {
      type: userType,
      description: "login User",
      args: {
        user: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const user = await Users.findOne({ name: args.user });

        if (!user) {
          throw new Error("No user with that email");
        }
        if (args.password === user._doc.password) {
          const token = jwt.sign(
            { _id: user._id, email: user.email, password: user.password },
            process.env.ACCESS_TOKEN_SECRET
          );

          return { ...user._doc, token };
        } else {
          throw new Error("Incorrect password");
        }
      },
    },
  }),
});

module.exports = RootMutationType;
