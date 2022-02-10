const { GraphQLNonNull, GraphQLString, GraphQLList } = require("graphql");
const Message = require("../../models/Message");
const { MessageType } = require("../Schemas/MessageSchema");

const messageQuery = {
  messages: {
    type: GraphQLList(MessageType),
    description: "list of message  between senders and receiver",
    args: {
      senderUserId: { type: GraphQLNonNull(GraphQLString) },
      receiverUserId: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args) => {
      const data = await Message.find({
        senderUserId: { $eq: args.senderUserId },
        receiverUserId: { $eq: args.receiverUserId },
      });
      return data;
    },
  },
};

module.exports = { messageQuery };
