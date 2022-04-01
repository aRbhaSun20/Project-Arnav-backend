const {
  MessageSchema,
  MessageType,
  messageOptionalSchema,
} = require("../Schemas/MessageSchema");
const Message = require("../../models/Message");
const { GraphQLNonNull, GraphQLString } = require("graphql");
require("dotenv").config();

const messageMutation = {
  addMessage: {
    type: MessageType,
    description: "Add New Message",
    args: {
      ...MessageSchema,
    },
    resolve: async (parent, args) => {
      const message = new Message({ ...args });
      return await message.save();
    },
  },
  editMessage: {
    type: MessageType,
    description: "Edit Message",
    args: {
      ...messageOptionalSchema,
    },
    resolve: async (parent, args) => {
      const { _id, ...remaining } = args;
      return await Message.findOneAndUpdate(
        { _id },
        { $set: { ...remaining } },
        { new: true }
      );
    },
  },
  deleteMessage: {
    type: MessageType,
    description: "Delete Message",
    args: {
      _id: {
        type: GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (parent, args) => {
      return await Message.findOneAndRemove({ _id: args._id });
    },
  },
};

module.exports = { messageMutation };
