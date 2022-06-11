const Users = require("../../models/Users");
const {
  userOptionalSchema,
  userSchema,
  userType,
} = require("../Schemas/UserSchema");
const { GraphQLNonNull, GraphQLString } = require("graphql");

const jwt = require("jsonwebtoken");
const { cacheManagement } = require("../../middlewares/CacheModule");
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
      cacheManagement.set(args.email, user);
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
      const data = await Users.findOneAndUpdate(
        { _id },
        { $set: { ...remaining } },
        { new: true }
      );
      cacheManagement.set(args.email, data);
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
      if (cacheManagement.has(args.user)) cacheManagement.del(args.user);
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
      let user = {};
      if (cacheManagement.has(args.user)) {
        user = cacheManagement.get(args.user);
      } else {
        user = await Users.findOne({ email: args.user });
        cacheManagement.set(args.user, user);
      }
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
