const Users = require("../../models/Users");
const { userOptionalSchema, userSchema, userType } = require("../Schemas/UserSchema");
const { GraphQLNonNull, GraphQLString } = require("graphql");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const userMutation = {
  signUpUser: {
    type: userType,
    description: "SignUp User",
    args: {
      ...userSchema,
    },
    resolve: async (parent, args) => {
      const user = await new Users({ ...args }).save();
      if (user) {
        const token = jwt.sign(
          { _id: user._id, email: user.email, password: user.password },
          process.env.ACCESS_TOKEN_SECRET
        );

        return { ...user._doc, token };
      }
      throw new Error("Error in user creation");
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
      const user = await Users.findOne({ email: args.user });

      if (!user) {
        throw new Error("No user with email");
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
};

module.exports = { userMutation };
