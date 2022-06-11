const { GraphQLNonNull, GraphQLString, GraphQLList } = require("graphql");
const Users = require("../../models/Users");
const { userType } = require("../Schemas/UserSchema");
const { ObjectId } = require("mongodb");
const { cacheManagement } = require("../../middlewares/CacheModule");

const userQuery = {
  user: {
    type: userType,
    description: "login user",
    args: {
      _id: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args) => {
      if (cacheManagement.has(args._id)) {
        return cacheManagement.get(args._id);
      } else {
        const data = await Users.findById(args._id);
        cacheManagement.set(args._id, data);
        return data;
      }
    },
  },
  users: {
    type: GraphQLList(userType),
    description: "list of users",
    resolve: async () => {
      const datas = await Users.find();
      datas.forEach((ele) => {
        cacheManagement.set(args._id, ele);
      });
    },
  },
};

module.exports = { userQuery };
