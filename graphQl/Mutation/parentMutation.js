const { GraphQLNonNull, GraphQLString } = require("graphql");
const {
  parentLocationType,
  parentLocationSchema,
  parentOptionalSchema,
} = require("../Schemas/parentLocationSchema");
const Parent = require("../../models/Parent");
require("dotenv").config();

const parentMutation = {
  addParent: {
    type: parentLocationType,
    description: "Add New Parent",
    args: {
      ...parentOptionalSchema,
    },
    resolve: async (parent, args) => {
      const parentLoc = new Parent({ ...args });
      return await parentLoc.save();
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
      return await Parent.findOneAndUpdate(
        { _id },
        { $set: { ...remaining } },
        { new: true }
      );
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
      return await Parent.findOneAndRemove({ _id: args._id });
    },
  },
};

module.exports = { parentMutation };
