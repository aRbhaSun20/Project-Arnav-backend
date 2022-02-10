const { GraphQLNonNull, GraphQLString, GraphQLList } = require("graphql");
const Message = require("../../models/Message");
const { MessageType } = require("../Schemas/MessageSchema");

const messageQuery = {
  message: {
    type: MessageType,
    description: "single message ",
    args: {
      _id: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async () => {
      return Message.findOne({ _id: args._id });
    },
  },
  messages: {
    type: GraphQLList(MessageType),
    description: "list of messages ",
    resolve: async () => {
      return await Message.find();
    },
  },
};

module.exports = { messageQuery };
