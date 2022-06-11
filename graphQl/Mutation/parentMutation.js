const { GraphQLNonNull, GraphQLString } = require("graphql");
const {
  parentLocationType,
  parentOptionalSchema,
} = require("../Schemas/parentLocationSchema");
const Parent = require("../../models/Parent");
const { cacheManagement, setKey } = require("../../middlewares/CacheModule");
require("dotenv").config();

const parentMutation = {
  addParent: {
    type: parentLocationType,
    description: "Add New Parent",
    args: {
      ...parentOptionalSchema,
    },
    resolve: async (parent, args) => {
      const parentLoc = await new Parent({ ...args }).save();
      if (cacheManagement.has("parentAll")) cacheManagement.del("parentAll");
      cacheManagement.set(setKey(parentLoc._id), parentLoc);
      return parentLoc;
    },
  },
  editParent: {
    type: parentLocationType,
    description: "Edit Parent",
    args: {
      ...parentOptionalSchema,
    },
    resolve: async (parent, args) => {
      const { _id, ...remaining } = args;
      const data = await Parent.findOneAndUpdate(
        { _id },
        { $set: { ...remaining } },
        { new: true }
      );
      if (cacheManagement.has("parentAll")) cacheManagement.del("parentAll");
      cacheManagement.set(setKey(data._id), data);
      return data;
    },
  },
  deleteParent: {
    type: parentLocationType,
    description: "Delete Parent",
    args: {
      _id: {
        type: GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (parent, args) => {
      if (cacheManagement.has(args._id)) cacheManagement.del(args._id);
      if (cacheManagement.has("parentAll")) cacheManagement.del("parentAll");
      return await Parent.findOneAndRemove({ _id: args._id });
    },
  },
};

module.exports = { parentMutation };
