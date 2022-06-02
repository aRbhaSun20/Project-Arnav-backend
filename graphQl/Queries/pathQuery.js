const { GraphQLNonNull, GraphQLString, GraphQLList } = require("graphql");
const Message = require("../../models/Message");
const Node = require("../../models/Node");
const { PathType } = require("../Schemas/PathSchema");

const pathQuery = {
  path: {
    type: PathType,
    description: "paths connecting nodes",
    args: {
      parentId: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args) => {
      // ?logic to find path
      // const data = await Message.find({
      //   senderUserId: { $eq: args.senderUserId },
      //   receiverUserId: { $eq: args.receiverUserId },
      // });
      // return data;
      return await Node.find({ parentId: args.parentId });
    },
  },
};

module.exports = { pathQuery };
